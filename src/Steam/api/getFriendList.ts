import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"
import { normalizeSteamID } from "../../Steam/SteamIdentifier.ts";

export type getFriendList_Relationship = 'all' | 'friend'

export async function getFriendList(steamid: (string | number), relationship: getFriendList_Relationship = 'friend') {
  const url = new URL(endpoints.steam + 'ISteamUser/GetFriendList/v1');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  url.searchParams.set('relationship', relationship);
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { friendslist: { friends: getFriendList_Result[] }} = await req.json().catch(e => { throw e; });
  return res.friendslist.friends;
}

export interface getFriendList_Result {
  /** @description 64 bit Steam ID of the friend. */
  steamid: string;
  /** @description Relationship qualifier */
  relationship: getFriendList_Relationship
  /** @description Unix timestamp of the time when the relationship was created. */
  friend_since: number;
}