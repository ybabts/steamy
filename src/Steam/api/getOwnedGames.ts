import { apiKeys, endpoints } from "src/mod.ts";
import { StatusCodes } from "x/https_status_codes"
import { normalizeSteamID } from "src/Steam/SteamIdentifier.ts";

export interface getOwnedGames_Parameters {
  /** @description Include game name and logo information in the output. The default is to return appids only. */
  include_appinfo: boolean;
  /** @description By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community. */
  include_played_free_games: boolean;
}

export async function getOwnedGames(steamid: (string | number), options?: Partial<getOwnedGames_Parameters>) {
  const url = new URL(endpoints.steam + 'IPlayerService/GetOwnedGames/v0001');
  if(options !== undefined)
    for(const [key, value] of Object.entries(options))
      url.searchParams.set(key, Number(value).toString());
  url.searchParams.set('steamid', normalizeSteamID(steamid).id64);
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { response: getOwnedGames_Result } = await req.json().catch(e => { throw e; });
  return res.response;
}

export interface getOwnedGames_Result {
  /** @description the total number of games the user owns (including free games they've played, if include_played_free_games was passed) */
  game_count: number,
  /** @description A games array, with the following contents (note that if "include_appinfo" was not passed in the request, only appid, playtime_2weeks, and playtime_forever will be returned) */
  games: getOwnedGames_Game[]
}

export interface getOwnedGames_Game {
  /** @description Unique identifier for the game */
  appid: number;
  /** @description The name of the game */
  name: string;
  /** @description The total number of minutes played "on record", since Steam began tracking total playtime in early 2009. */
  playtime_forever: number;
  /** @description The total number of minutes played "on record", since Steam began tracking total playtime in early 2009. */
  playtime_windows_forever: number;
  /** @description The total number of minutes played "on record", since Steam began tracking total playtime in early 2009. */
  playtime_mac_forever: number;
  /** @description The total number of minutes played "on record", since Steam began tracking total playtime in early 2009. */
  playtime_linux_forever: number;
  /** @description The time last played */
  rtime_last_played: number;
  /** @description The total number of minutes played in the last 2 weeks */
  playtime_2weeks?: number;
  /** @description these are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [1] */
  img_icon_url?: string;
  /** @description these are the filenames of various images for the game. To construct the URL to the image, use this format: http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg. For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [1] */
  img_logo_url?: string;
  /** @description whether or not the game has leaderboards */
  has_leaderboards?: boolean;
  /** @description indicates there is a stats page with achievements or other game stats available for this game. The uniform URL for accessing this data is http://steamcommunity.com/profiles/{steamid}/stats/{appid}. For example, Robin's TF2 stats can be found at: http://steamcommunity.com/profiles/76561197960435530/stats/440. You may notice that clicking this link will actually redirect to a vanity URL like /id/robinwalker/stats/TF2 */
  has_community_visible_stats?: boolean;
  /** @description  */
  content_descriptorids?: number[];
}