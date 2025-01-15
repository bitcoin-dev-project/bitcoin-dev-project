import { NextRequest } from "next/server"
import nostrPubkeys from "./nostr.json"

// NIP-05 support
// See https://github.com/nostr-protocol/nips/blob/master/05.md#example
export async function GET(request: NextRequest) {
    try {
        const name = request.nextUrl.searchParams.get("name") as string

        if (!name) {
            return new Response(
                JSON.stringify({ error: "No name passed in request" }),
                {
                    status: 400,
                    headers: { "content-type": "application/json" }
                }
            )
        }

        const pubkey = nostrPubkeys.names[name]

        if (!pubkey) {
            return new Response(
                JSON.stringify({ error: `No pubkey found for ${name}` }),
                {
                    status: 404,
                    headers: { "content-type": "application/json" }
                }
            )
        }

        const clientResponse = {
            names: {
                [name]: pubkey
            }
        }

        return new Response(JSON.stringify(clientResponse), {
            status: 200,
            headers: { "content-type": "application/json" }
        })
    } catch (error: any) {
        console.error(error)

        return new Response(
            JSON.stringify({
                error:
                    error instanceof Error ? error.message : "An Error Occurred"
            }),
            {
                status: 500,
                headers: { "content-type": "application/json" }
            }
        )
    }
}
