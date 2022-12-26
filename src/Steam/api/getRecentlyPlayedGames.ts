import { apiKeys, endpoints } from "src/mod.ts";
import { StatusCodes } from "x/https_status_codes"
import { normalizeSteamID } from "src/Steam/SteamIdentifier.ts";

export interface getRecentlyPlayedGames_Parameters {
  /** @description Include game name and logo information in the output. The default is to return appids only. */
  include_appinfo: boolean;
  /** @description By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community. */
  include_played_free_games: boolean;
}

export async function getRecentlyPlayedGames(steamid: (string | number), count?: number) {
  const url = new URL(endpoints.steam + 'IPlayerService/GetRecentlyPlayedGames/v0001');
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  if(count) url.searchParams.set('count', count.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { response: getRecentlyPlayedGames_Result } = await req.json().catch(e => { throw e; });
  return res.response;
}

export interface getRecentlyPlayedGames_Result {
  /** @description  the total number of unique games the user has played in the last two weeks. This is mostly significant if you opted to return a limited number of games with the count input parameter */
  total_count: number,
  /** @description A games array, with the following contents: */
  games: getRecentlyPlayedGames_Game[]
}

export interface getRecentlyPlayedGames_Game {
  /** @description Unique identifier for the game */
  appid: number;
  /** @description The name of the game */
  name: string;
  /** @description The total number of minutes played in the last 2 weeks */
  playtime_2weeks: number;
  /** @description The total number of minutes played "on record", since Steam began tracking total playtime in early 2009. */
  playtime_forever: number;
  /** @description these are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [1] */
  img_icon_url?: string;
  /** @description these are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [1] */
  img_logo_url?: string;
}