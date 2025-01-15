/**
 * @jest-environment node
 */
import { GET } from "./route"

it("should return data with status 200", async () => {
    // from app/.well-known/nostr.json/nostr.json
    const name = "_"
    const pubkey =
        "78631371f159c1e696665da1a8b41546d75655b1085b4fe1a1a8d05b9a0d7a4e"

    const requestObj = {
        nextUrl: {
            searchParams: new URLSearchParams({ name })
        }
    } as any

    const response = await GET(requestObj)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.headers.get("Access-Control-Allow-Origin")).toEqual("*")
    expect(body.names[name]).toBe(pubkey)
})

it("should return a 404 if no pubkey is found", async () => {
    const name = "foo"
    const expectedError = `No pubkey found for ${name}`

    const requestObj = {
        nextUrl: {
            searchParams: new URLSearchParams({ name })
        }
    } as any

    const response = await GET(requestObj)
    const body = await response.json()

    expect(response.status).toBe(404)
    expect(body.error).toBe(expectedError)
})

it("should return a 400 if the name parameter is missing", async () => {
    const notName = "foo"
    const expectedError = `No name passed in request`

    const requestObj = {
        nextUrl: {
            searchParams: new URLSearchParams({ notName })
        }
    } as any

    const response = await GET(requestObj)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toBe(expectedError)
})
