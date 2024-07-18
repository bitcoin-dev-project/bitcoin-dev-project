import { Transaction, payments, script as btcScript } from "bitcoinjs-lib"

class TransactionDecoder {
    rawTx: string
    network: string

    constructor(rawTx: string, network: string) {
        this.rawTx = rawTx
        this.network = network
    }

    // Assuming TransactionDecoder is set up correctly to include scriptSig for inputs
    decode() {
        const tx = Transaction.fromHex(this.rawTx)
        const decodedTransaction = {
            txid: tx.getId(),
            version: tx.version,
            locktime: tx.locktime,
            inputs: tx.ins.map((input) => ({
                txid: Buffer.from(input.hash).reverse().toString("hex"),
                n: input.index,
                scriptSig: {
                    asm: this.toCustomASM(input.script),
                    hex: input.script.toString("hex")
                },
                sequence: input.sequence
            })),
            outputs: tx.outs.map((output, index) => ({
                satoshi: output.value,
                value: (output.value * 1e-8).toFixed(8),
                n: index,
                scriptPubKey: {
                    asm: this.toCustomASM(output.script),
                    hex: output.script.toString("hex"),
                    type: this.classifyOutputScript(output.script)
                }
            }))
        }

        return decodedTransaction
    }

    toCustomASM(scriptBuffer: any) {
        const script = btcScript.decompile(scriptBuffer)
        if (!script) return ""

        return script
            .map((element) => {
                if (typeof element === "number") {
                    return btcScript.toASM([element])
                } else if (element.length) {
                    const opcode = "OP_PUSHBYTES_" + element.length
                    const hex = element.toString("hex")
                    return `${opcode} ${hex}`
                }
                return ""
            })
            .join(" ")
    }

    classifyOutputScript(script: any) {
        const isOutput = (paymentFn: any) => {
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
}

export default TransactionDecoder
