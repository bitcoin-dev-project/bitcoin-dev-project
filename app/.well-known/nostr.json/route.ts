import { NextRequest } from "next/server"
import { promises as fs } from 'fs';

// NIP-05 support
// See https://github.com/nostr-protocol/nips/blob/master/05.md#example
export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get('name') as string;

    const file = await fs.readFile(process.cwd() + '/app/.well-known/nostr.json/nostr.json', 'utf8');
    const data = JSON.parse(file);
    const pubkey = data.names[name];

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
    if (error.status === 400) {
        return new Response(error.response.text, {
            status: 400,
            headers: { "content-type": "application/json" }
        })
    }

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