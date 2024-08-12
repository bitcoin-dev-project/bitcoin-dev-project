import {
    Transaction,
    payments,
    script as btcScript,
    TxInput,
    TxOutput
} from "bitcoinjs-lib"

function isBuffer(value: unknown): value is Buffer {
    return Buffer.isBuffer(value)
}

class TransactionDecoder {
    constructor(
        private rawTx: string,
        private network: string
    ) {}

    decode() {
        const tx = Transaction.fromHex(this.rawTx)
        return {
            txid: tx.getId(),
            version: tx.version,
            locktime: tx.locktime,
            inputs: this.decodeInputs(tx),
            outputs: this.decodeOutputs(tx)
        }
    }

    private decodeInputs(tx: Transaction) {
        return tx.ins.map((input) => ({
            txid: Buffer.from(input.hash).reverse().toString("hex"),
            n: input.index,
            scriptSig: {
                asm: this.toCustomASM(input.script),
                hex: input.script.toString("hex")
            },
            sequence: input.sequence,
            type: this.classifyInputType(input),
            witness: input.witness
                ? input.witness.map((w) => w.toString("hex"))
                : undefined
        }))
    }

    private decodeOutputs(tx: Transaction) {
        return tx.outs.map((output, index) => ({
            satoshi: output.value,
            value: (output.value * 1e-8).toFixed(8),
            n: index,
            scriptPubKey: {
                asm: this.toCustomASM(output.script),
                hex: output.script.toString("hex")
            },
            type: this.classifyOutputScript(output.script)
        }))
    }

    private toCustomASM(scriptBuffer: Buffer): string {
        const script = btcScript.decompile(scriptBuffer)
        if (!script) return ""

        return script
            .map((element) => {
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
        const isOutput = (paymentFn: (args: { output: Buffer }) => unknown) => {
            try {
                return paymentFn({ output: script })
                    ? paymentFn.name
                    : undefined
            } catch (e) {
                return undefined
            }
        }

        if (isOutput(payments.p2pk)) return "P2PK"
        else if (isOutput(payments.p2pkh)) return "P2PKH"
        else if (isOutput(payments.p2ms)) return "P2MS (multisig)"
        else if (isOutput(payments.p2wpkh)) return "P2WPKH"
        else if (isOutput(payments.p2sh)) return "P2SH"

        return "nonstandard"
    }

    private classifyInputType(input: TxInput): string {
        if (input.witness && input.witness.length > 0) {
            // Witness input
            if (input.witness.length === 2) {
                return "P2WPKH"
            } else if (input.witness.length > 2) {
                return "P2WSH"
            }
        } else if (input.script) {
            // Non-witness input
            const decompiled = btcScript.decompile(input.script)
            if (!decompiled) return "UNKNOWN"

            if (decompiled.length === 2 && isBuffer(decompiled[1])) {
                return "P2PKH"
            } else if (
                decompiled.length > 2 &&
                isBuffer(decompiled[decompiled.length - 1]) &&
                (decompiled[decompiled.length - 1] as Buffer).equals(
                    Buffer.from("OP_CHECKMULTISIG", "ascii")
                )
            ) {
                return "P2SH (likely multisig)"
            } else if (decompiled.length === 1 && isBuffer(decompiled[0])) {
                return "P2SH"
            }
        }

        return "UNKNOWN"
    }
}

export default TransactionDecoder
