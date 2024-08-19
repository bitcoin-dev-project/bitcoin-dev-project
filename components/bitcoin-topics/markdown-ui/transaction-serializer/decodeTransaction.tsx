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
        ): string | undefined => {
            try {
                return paymentFn({ output: script })
                    ? paymentFn.name
                    : undefined
            } catch (e) {
                return undefined
            }
        }

        if (isOutput(payments.p2pk)) return "P2PK"
        if (isOutput(payments.p2pkh)) return "P2PKH"
        if (isOutput(payments.p2ms)) return "P2MS (multisig)"
        if (isOutput(payments.p2wpkh)) return "P2WPKH"
        if (isOutput(payments.p2sh)) return "P2SH"

        return "nonstandard"
    }

    private classifyInputType(input: TxInput): string {
        if (input.witness.length > 0) {
            return input.witness.length === 2 ? "P2WPKH" : "P2WSH"
        }

        if (input.script.length > 0) {
            const decompiled = btcScript.decompile(input.script)
            if (!decompiled) return "UNKNOWN"

            if (decompiled.length === 2 && isBuffer(decompiled[1])) {
                return "P2PKH"
            }

            if (
                decompiled.length > 2 &&
                isBuffer(decompiled[decompiled.length - 1]) &&
                (decompiled[decompiled.length - 1] as Buffer).equals(
                    Buffer.from("OP_CHECKMULTISIG", "ascii")
                )
            ) {
                return "P2SH (likely multisig)"
            }

            if (decompiled.length === 1 && isBuffer(decompiled[0])) {
                return "P2SH"
            }
        }

        return "UNKNOWN"
    }
}

export default TransactionDecoder
