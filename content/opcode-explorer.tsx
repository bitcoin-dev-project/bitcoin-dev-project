export type StackItem = string | number | boolean | bigint

export interface Opcode {
    name: string
    execute: (stack: StackItem[]) => StackItem[]
}

export const opcodeData = {
    OP_CHECKSIG: {
        hex: "0xAC",
        description:
            "Verifies a signature against a public key and the transaction data. If the signature is valid, it pushes 1 onto the stack; otherwise, it pushes 0.",
        asm: "<sig> <pubkey> OP_CHECKSIG",
        hexCode: "<sig> <pubkey> 0xAC",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_CHECKSIG.svg",
        svgId: "etLaMCOGQ3q1"
    },
    OP_CHECKMULTISIG: {
        hex: "0xAE",
        description:
            "Verifies multiple signatures against multiple public keys. It checks if at least m of n signatures are valid. If yes push 1 (true) to the stack, otherwise 0 (false)",
        asm: "0 <Signature2> <Signature3> 2 <PublicKey1> <PublicKey2> <PublicKey3> 3 OP_CHECKMULTISIG",
        hexCode:
            "0x00 <Signature2> <Signature3> 0x52 <PublicKey1> <PublicKey2> <PublicKey3> 0x53 0xAE",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_CHECKMULTISIG.svg",
        svgId: "eMfFZSNeGgU1"
    },
    OP_RETURN: {
        hex: "0x6A",
        description:
            "Marks the output as containing data and makes it unspendable. It is often used to embed arbitrary data into the blockchain.",
        asm: "OP_RETURN <data>",
        hexCode: "0x6A <data>",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_RETURN.svg",
        svgId: "ePRvDAyVHFs1"
    },
    OP_DUP: {
        hex: "0x76",
        description:
            "Duplicates the top item on the stack and pushes it onto the stack again.",
        asm: "5 OP_DUP",
        hexCode: "0x05 0x76",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_DUP.svg",
        svgId: "eGP7zSnXZvb1"
    },
    OP_EQUAL: {
        hex: "0x87",
        description:
            "Compares the top two items on the stack. If they are equal, it pushes 1 onto the stack; otherwise, it pushes 0.",
        asm: "5 5 OP_EQUAL",
        hexCode: "0x05 0x05 0x87",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_EQUAL.svg",
        svgId: "enWCL7dSHsN1"
    },
    OP_HASH160: {
        hex: "0xA9",
        description:
            "Hashes the top item on the stack twice: first with SHA-256 and then with RIPEMD-160.",
        asm: "<data> OP_HASH160",
        hexCode: "<data> 0xA9",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_HASH160.svg",
        svgId: "enqhsG8NxoX1"
    },
    OP_EQUALVERIFY: {
        hex: "0x88",
        description:
            "Compares the top two items on the stack for equality. If they are not equal, the script fails.",
        asm: "5 5 OP_EQUAL",
        hexCode: "0x05 0x05 0x87",
        svgPath:
            "/bitcoin-topics/static/images/topics/overview/OP_EQUALVERIFY.svg",
        svgId: "eO6lxqRz2Gw1"
    },
    OP_IF: {
        hex: "0x63",
        description:
            "Evaluates a condition. If the condition is true (non-zero), it executes the statements after OP_IF. Otherwise, it jumps to the code after OP_ELSE, if present, or OP_ENDIF.",
        asm: "<condition> OP_IF <true branch code> OP_ELSE <false branch code> OP_ENDIF",
        hexCode:
            "<condition> 0x63 <true branch code> 0x67 <false branch code> 0x68",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_IF.svg",
        svgId: "eXi1yJfSEOH1"
    },
    OP_ELSE: {
        hex: "0x67",
        description:
            "Marks the beginning of the false branch of a conditional execution (used after OP_IF). The code after OP_ELSE is executed if the condition evaluated by OP_IF is false (zero).",
        asm: "OP_IF <true_statements> OP_ELSE <false_statements> OP_ENDIF",
        hexCode: "0x63 <true_statements> 0x67 <false_statements> 0x68",
        svgPath: "/bitcoin-topics/static/images/topics/overview/OP_ELSE.svg",
        svgId: "exNKX69acQq1"
    }
}

export const opcodes: Opcode[] = [
    {
        name: "OP_ADD",
        execute: (stack) => {
            const [newStack, items] = popFromStack(stack, 2)
            if (typeof items === "string") return [...newStack, items]
            const [b, a] = items as [StackItem, StackItem]
            if (typeof a === "bigint" && typeof b === "bigint") {
                return [...newStack, a + b]
            }
            return [...newStack, "Error: Non-numeric values"]
        }
    },
    {
        name: "OP_EQUAL",
        execute: (stack) => {
            const [newStack, items] = popFromStack(stack, 2)
            if (typeof items === "string") return [...newStack, items]
            const [b, a] = items as [StackItem, StackItem]
            return [...newStack, a === b]
        }
    },
    {
        name: "OP_DUP",
        execute: (stack) => {
            if (stack.length < 1) return [...stack, "Error: Insufficient items"]
            const a = stack[stack.length - 1]
            return [...stack, a]
        }
    },
    {
        name: "OP_SWAP",
        execute: (stack) => {
            if (stack.length < 2) return [...stack, "Error: Insufficient items"]
            const newStack = [...stack]
            const a = newStack.pop()!
            const b = newStack.pop()!
            return [...newStack, a, b]
        }
    }
]

const popFromStack = (
    stack: StackItem[],
    count: number
): [StackItem[], StackItem[] | string] => {
    if (stack.length < count) return [stack, `Error: Insufficient items`]
    const items = stack.slice(-count)
    return [stack.slice(0, -count), items]
}
