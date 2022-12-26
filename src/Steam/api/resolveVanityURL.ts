import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

/** The user's vanity URL that you would like to retrieve a steam ID for, e.g. http://steamcommunity.com/id/gabelogannewell would use "gabelogannewell" */
export async function resolveVanityURL(vanityurl: string) {
  const url = new URL(endpoints.steam + 'ISteamUser/ResolveVanityURL/v0001');
  url.searchParams.set('vanityurl', vanityurl.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { response: resolveVanityURL_Result } = await req.json().catch(e => { throw e; });
  return res.response;
}

export enum resolveVanityURL_Status {
  SUCCESS = 1,
  FAILED = 42
}

export interface resolveVanityURL_Result {
  /** The status of the request. 1 if successful, 42 if there was no match. */
  success: resolveVanityURL_Status;
  /** The message associated with the request status. Currently only used on resolution failures. */
  message?: string;
  /** The 64 bit Steam ID the vanity URL resolves to. Not returned on resolution failures. */
  steamid: string;
}