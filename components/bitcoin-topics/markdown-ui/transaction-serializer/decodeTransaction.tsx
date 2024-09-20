import {
    Transaction,
    payments,
    script as btcScript,
    TxInput,
    Network
} from "bitcoinjs-lib"

function isBuffer(value: unknown): value is Buffer {
    return Buffer.isBuffer(value)
}

interface ScriptDetail {
    asm: string
    hex: string
    type?: string
}

interface TransactionInput {
    txid: string
    n: number
    scriptSig: ScriptDetail
    sequence: number
    type: string
    witness?: string[]
}

interface TransactionOutput {
    value: number
    n: number
    scriptPubKey: ScriptDetail
    type: string
}

export interface DecodedTransaction {
    txid: string
    version: number
    locktime: number
    inputs: TransactionInput[]
    outputs: TransactionOutput[]
    [key: string]: unknown
}

class TransactionDecoder {
    private tx: Transaction

    constructor(
        private rawTx: string,
        private network: Network
    ) {
        this.tx = Transaction.fromHex(this.rawTx)
    }

    decode(): DecodedTransaction {
        return {
            txid: this.tx.getId(),
            version: this.tx.version,
            locktime: this.tx.locktime,
            inputs: this.decodeInputs(),
            outputs: this.decodeOutputs()
        }
    }

    private decodeInputs(): TransactionInput[] {
        return this.tx.ins.map(
            (input): TransactionInput => ({
                txid: Buffer.from(input.hash).reverse().toString("hex"),
                n: input.index,
                scriptSig: {
                    asm: this.toCustomASM(input.script),
                    hex: input.script.toString("hex")
                },
                sequence: input.sequence,
                type: this.classifyInputType(input),
                witness:
                    input.witness.length > 0
                        ? input.witness.map((w) => w.toString("hex"))
                        : undefined
            })
        )
    }

    private decodeOutputs(): TransactionOutput[] {
        return this.tx.outs.map(
            (output, index): TransactionOutput => ({
                value: output.value,
                n: index,
                scriptPubKey: {
                    asm: this.toCustomASM(output.script),
                    hex: output.script.toString("hex")
                },
                type: this.classifyOutputScript(output.script)
            })
        )
    }

    private toCustomASM(scriptBuffer: Buffer): string {
        const script = btcScript.decompile(scriptBuffer)
        if (!script) return ""

        return script
            .map((element): string => {
                if (typeof element === "number") {
                    return btcScript.toASM([element])
                } else if (isBuffer(element)) {
                    const opcode = "OP_PUSHBYTES_" + element.length
                    const hex = element.toString("hex")
                    return `${opcode} ${hex}`
                }
                return ""
            })
            .join(" ")
    }

    private classifyOutputScript(script: Buffer): string {
        const isOutput = (
            paymentFn: (args: { output: Buffer }) => unknown
        ): boolean => {
            try {
                return !!paymentFn({ output: script })
            } catch (e) {
                // console.error(`Error checking ${paymentFn.name}:`, e);
                return false
            }
        }

        if (isOutput(payments.p2pk)) return "P2PK"
        if (isOutput(payments.p2pkh)) return "P2PKH"
        if (isOutput(payments.p2ms)) return "P2MS (multisig)"
        if (isOutput(payments.p2wpkh)) return "P2WPKH"
        if (isOutput(payments.p2wsh)) return "P2WSH"
        if (isOutput(payments.p2sh)) return "P2SH"

        return "nonstandard"
    }

    private classifyInputType(input: TxInput): string {
        // Check for native SegWit inputs
        if (input.witness.length > 0) {
            return input.witness.length === 2 ? "P2WPKH" : "P2WSH"
        }

        // Non-witness inputs
        if (input.script.length > 0) {
            const decompiled = btcScript.decompile(input.script)
            if (!decompiled) return "UNKNOWN"

            // P2PKH: <signature> <pubkey>
            if (
                decompiled.length === 2 &&
                isBuffer(decompiled[0]) &&
                isBuffer(decompiled[1]) &&
                decompiled[0].length >= 70 &&
                decompiled[1].length >= 33
            ) {
                return "P2PKH"
            }

            // P2SH: <...> <redeemScript>
            if (
                decompiled.length >= 2 &&
                isBuffer(decompiled[decompiled.length - 1])
            ) {
                const redeemScript = btcScript.decompile(
                    decompiled[decompiled.length - 1] as Buffer
                )
                if (redeemScript) {
                    // P2SH-P2WPKH
                    if (
                        redeemScript.length === 2 &&
                        redeemScript[0] === 0 &&
                        isBuffer(redeemScript[1]) &&
                        redeemScript[1].length === 20
                    ) {
                        return "P2SH-P2WPKH"
                    }
                    // P2SH-P2WSH
                    if (
                        redeemScript.length === 2 &&
                        redeemScript[0] === 0 &&
                        isBuffer(redeemScript[1]) &&
                        redeemScript[1].length === 32
                    ) {
                        return "P2SH-P2WSH"
                    }
                    // P2SH-Multisig
                    if (
                        redeemScript[redeemScript.length - 1] ===
                        btcScript.OPS.OP_CHECKMULTISIG
                    ) {
                        return "P2SH-Multisig"
                    }
                }
                return "P2SH"
            }

            // Legacy P2PK: <signature>
            if (
                decompiled.length === 1 &&
                isBuffer(decompiled[0]) &&
                decompiled[0].length >= 70
            ) {
                return "P2PK"
            }
        }

        return "UNKNOWN"
    }
}

export default TransactionDecoder
