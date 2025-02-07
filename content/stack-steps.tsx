export interface ExecutionStep {
    name: string
    description: string
    duration: number
}

export interface ScriptExecutionConfig {
    svgPath: string
    svgId: string
    steps: ExecutionStep[]
}

export const scriptExecutionConfigs: Record<string, ScriptExecutionConfig> = {
    p2pk: {
        svgPath: "/decoding-bitcoin/static/images/topics/p2pk/p2pk.svg",
        svgId: "esVE0LwtziS1",
        steps: [
            {
                name: "Step 1",
                description: "Push <signature> onto the stack",
                duration: 2
            },
            {
                name: "Step 2",
                description: "Push <pubkey> onto the stack",
                duration: 2
            },
            {
                name: "Step 3",
                description: "Pop two items (pub-key & signature)",
                duration: 2
            },
            {
                name: "Step 4",
                description: "Verify ECDSA signature",
                duration: 2
            },
            {
                name: "Step 5",
                description: "Push 1 onto the stack if the signature is Valid",
                duration: 2
            }
        ]
    },
    p2pkh: {
        svgPath: "/decoding-bitcoin/static/images/topics/p2pk/p2pkh.svg",
        svgId: "e6TEc1LyYNP1",
        steps: [
            {
                name: "Step 1",
                description: "Push <signature> onto the stack",
                duration: 2
            },
            {
                name: "Step 2",
                description: "Push <pubkey> onto the stack",
                duration: 2
            },
            {
                name: "Step 3",
                description: "Duplicate the public key",
                duration: 2
            },
            {
                name: "Step 4",
                description: "Hash the duplicated public key",
                duration: 2
            },
            {
                name: "Step 5",
                description: "Push <pubkey_hash> onto the stack",
                duration: 2
            },
            {
                name: "Step 6",
                description:
                    "Compare the computed public key hash with the provided hash",
                duration: 2
            },
            {
                name: "Step 7",
                description: "Verify ECDSA signature",
                duration: 2
            }
        ]
    },
    p2sh: {
        svgPath: "/decoding-bitcoin/static/images/topics/p2sh/p2sh.svg",
        svgId: "eqnufOUG9Zo1",
        steps: [
            {
                name: "Step 1",
                description: "Push <Signature> onto the stack",
                duration: 2
            },
            {
                name: "Step 2",
                description: "Push <redeem_script> onto the stack",
                duration: 2
            },
            {
                name: "Step 3",
                description: "Copy the stack",
                duration: 2
            },
            {
                name: "Step 4",
                description: "Apply hash160 to <redeem_script>",
                duration: 2
            },
            {
                name: "Step 5",
                description: "Push <script_hash> onto the stack",
                duration: 2
            },
            {
                name: "Step 6",
                description: "Compare the two hashes",
                duration: 2
            },
            {
                name: "Step 7",
                description: "Execute <redeem_script>",
                duration: 2
            }
        ]
    }
}
