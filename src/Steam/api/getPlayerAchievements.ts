import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"
import { normalizeSteamID } from "../../Steam/SteamIdentifier.ts";

export async function getPlayerAchievements(steamid: (string | number), appid: number) {
  const url = new URL(endpoints.steam + 'ISteamUserStats/GetPlayerAchievements/v0001');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  url.searchParams.set('appid', appid.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { playerstats: getPlayerAchievements_Result } = await req.json().catch(e => { throw e; });
  return res.playerstats;
}

export interface getPlayerAchievements_Result {
  steamID: string,
  gameName: string,
  achievements: getPlayerAchievements_Achievement[],
  success: boolean
}

export interface getPlayerAchievements_Achievement {
  /** @description The API name of the achievement */
  apiname: string;
  /** @description Whether or not the achievement has been completed. */
  achieved: number;
  /** @description Date when the achievement was unlocked. */
  unlocktime: number;
  /** @description Localized achievement name */
  name?: string;
  /** @description Localized description of the achievement */
  description?: string;
}