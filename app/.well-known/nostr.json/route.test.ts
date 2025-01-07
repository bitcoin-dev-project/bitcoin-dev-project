/**
 * @jest-environment node
 */
import { GET } from './route';

it('should return data with status 200', async () => {
  // from app/.well-known/nostr.json/nostr.json
  const name = "_";
  const pubkey = "78631371f159c1e696665da1a8b41546d75655b1085b4fe1a1a8d05b9a0d7a4e";

  const requestObj = {
    nextUrl: {
      searchParams: new URLSearchParams({ name }),
    },
  } as any;

  const response = await GET(requestObj);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(body.names[name]).toBe(pubkey);
});
