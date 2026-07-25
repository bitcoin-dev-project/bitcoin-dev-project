import {
    Transaction,
    payments,
    script as btcScript,
    address as btcAddress,
    networks,
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
    address?: string
    opReturnData?: string
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
        return this.tx.outs.map((output, index): TransactionOutput => {
            const type = this.classifyOutputScript(output.script)
            return {
                value: output.value,
                n: index,
                scriptPubKey: {
                    asm: this.toCustomASM(output.script),
                    hex: output.script.toString("hex")
                },
                type,
                address: this.deriveAddress(output.script),
                opReturnData:
                    type === "OP_RETURN"
                        ? this.decodeOpReturn(output.script)
                        : undefined
            }
        })
    }

    // Best-effort address for an output script. Legacy and v0-witness
    // scripts go through bitcoinjs directly; taproot (witness v1) is
    // encoded as bech32m by hand because payments.p2tr needs initEccLib().
    private deriveAddress(script: Buffer): string | undefined {
        const net = this.network || networks.bitcoin
        try {
            return btcAddress.fromOutputScript(script, net)
        } catch {
            if (
                script.length === 34 &&
                script[0] === btcScript.OPS.OP_1 &&
                script[1] === 0x20
            ) {
                try {
                    return btcAddress.toBech32(script.slice(2), 1, net.bech32)
                } catch {
                    return undefined
                }
            }
            return undefined
        }
    }

    // Decode an OP_RETURN payload as text, but only when it is printable
    // (the common "human message" case). Binary data returns undefined.
    private decodeOpReturn(script: Buffer): string | undefined {
        const decompiled = btcScript.decompile(script)
        if (!decompiled) return undefined
        const dataPush = decompiled.find((el): el is Buffer => isBuffer(el))
        if (!dataPush) return undefined
        const text = dataPush.toString("utf8")
        const roundTrips = Buffer.from(text, "utf8").equals(dataPush)
        // eslint-disable-next-line no-control-regex
        const printable = !/[\x00-\x08\x0e-\x1f]/.test(text)
        return roundTrips && printable ? text : undefined
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

        // OP_RETURN (nulldata): starts with OP_RETURN (0x6a)
        if (script.length > 0 && script[0] === btcScript.OPS.OP_RETURN) {
            return "OP_RETURN"
        }

        // P2TR: OP_1 (0x51) followed by a 32-byte witness program.
        // Detected by bytes because payments.p2tr requires initEccLib().
        if (
            script.length === 34 &&
            script[0] === btcScript.OPS.OP_1 &&
            script[1] === 0x20
        ) {
            return "P2TR"
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
