import { SteamIdentifier } from "../mod.ts";
import { endpoint } from "./mod.ts";

type SteamID = SteamIdentifier | string | number;

export type CountryCode = 'AF' | 'AX' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BQ' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'CV' | 'KH' | 'CM' | 'CA' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CD' | 'CK' | 'CR' | 'CI' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'DK' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'VA' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KP' | 'KR' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MK' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'SS' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UM' | 'UY' | 'UZ' | 'VU' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW';
export type StateCode = 'AL' | 'AK' | 'AS' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FM' | 'FL' | 'GA' | 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MH' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'MP' | 'OH' | 'OK' | 'OR' | 'PW' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export enum PersonaState {
  'OFFLINE', 'ONLINE', 'BUSY', 'AWAY', 'SNOOZE', 'LOOKING TO TRADE', 'LOOKING TO PLAY'
}
export enum CommunityVisibilityState {
  'NOT VISIBLE' = 1,
  'VISIBLE' = 3
}
export enum ProfileState {
  'DEFAULT', 'CONFIGURED'
}

export interface SummaryPublic {
  /** @description 64bit SteamID of the user */
  steamid: string;
  /** @description The player's persona name (display name) */
  personaname: string;
  /** @description The full URL of the player's Steam Community profile. */
  profileurl: string;
  /** @description The full URL of the player's 32x32px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatar: string;
  /** @description The full URL of the player's 64x64px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatarmedium: string;
  /** @description The full URL of the player's 184x184px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatarfull: string;
  /** @description The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play. If the player's profile is private, this will always be "0", except is the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private. */
  personastate: PersonaState;
  /** @description This represents whether the profile is visible or not, and if it is visible, why you are allowed to see it. Note that because this WebAPI does not use authentication, there are only two possible values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile is "Public", and the data is visible. Mike Blaszczak's post on Steam forums says, "The community visibility state this API returns is different than the privacy state. It's the effective visibility state from the account making the request to the account being viewed given the requesting account's relationship to the viewed account." */
  communityvisibilitystate: CommunityVisibilityState;
  /** @description If set, indicates the user has a community profile configured (will be set to '1') */
  profilestate: ProfileState;
  /** @description The last time the user was online, in unix time. */
  lastlogoff: number;
  /** @description If set, indicates the profile allows public comments. */
  commentpermission: number;
}

export interface SummaryPrivate {
  /** @description The player's "Real Name", if they have set it. */
  realname: string;
  /** @description The player's primary group, as configured in their Steam Community profile. */
  primaryclanid: string;
  /** @description The time the player's account was created. */
  timecreated: number;
  /** @description If the user is currently in-game, this value will be returned and set to the gameid of that game. */
  gameid: string;
  /** @description The ip and port of the game server the user is currently playing on, if they are playing on-line in a game using Steam matchmaking. Otherwise will be set to "0.0.0.0:0". */
  gameserverip: string;
  /** @description If the user is currently in-game, this will be the name of the game they are playing. This may be the name of a non-Steam game shortcut. */
  gameextrainfo: string;
  /** @description This value will be removed in a future update (see loccityid) */
  cityid: number;
  /** @description If set on the user's Steam Community profile, The user's country of residence, 2-character ISO country code */
  loccountrycode: CountryCode;
  /** @description If set on the user's Steam Community profile, The user's state of residence */
  locstatecode?: StateCode;
  /** 
   * @description An internal code indicating the user's city of residence. A future update will provide this data in a more useful way.
    steam_location gem/package makes player location data readable for output.
    An updated readable list can be found at quer's steam location
    Getting locstatecode and loccityid, can now be done from https://steamcommunity.com/actions/QueryLocations/<loccountrycode>/<locstatecode>/
  */
  loccityid?: number;
}

const key = `&key=${Deno.env.get('steam_api_key')}`;

export async function getPlayerSummaries(steamids: SteamID[]) {
  const ids = steamids.map(id => id instanceof SteamIdentifier ? id.id64 : SteamIdentifier.normalizeSteamID(id).id64).join(',');
  const url = endpoint + `ISteamUser/GetPlayerSummaries/v0002?steamids=${ids}` + key;
  const req = await fetch(url);
  const result: {
    response: {
      players: (SummaryPublic & Partial<SummaryPrivate>)[]
    }
  } = await req.json();
  return result.response.players;
}

export interface FriendList {
  /** @description 64 bit Steam ID of the friend. */
  steamid: string;
  /** @description Relationship qualifier */
  relationship: "friend",
  /** @description Unix timestamp of the time when the relationship was created. */
  friend_since: number;
}

export async function getFriendList(steamid: SteamID, relationship: 'all' | 'friend' = 'friend') {
  const id = steamid instanceof SteamIdentifier ? steamid.id64 : SteamIdentifier.normalizeSteamID(steamid).id64;
  const url = endpoint + `ISteamUser/GetFriendList/v0001?steamid=${id}&relationship=${relationship}` + key;
  const req = await fetch(url);
  const result: {
    friendslist: {
      friends: FriendList[];
    }
  } = await req.json();
  return result.friendslist.friends;
}

export interface Achievement {
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

export async function getPlayerAchievements(steamid: SteamID, appid: number) {
  const id = steamid instanceof SteamIdentifier ? steamid.id64 : SteamIdentifier.normalizeSteamID(steamid).id64;
  const url = endpoint + `ISteamUserStats/GetPlayerAchievements/v0001?steamid=${id}&appid=${appid}` + key;
  const req = await fetch(url);
  const result: {
    playerstats: {
      steamID: string,
      gameName: string,
      achievements: Achievement[],
      success: boolean
    }
  } = await req.json();
  return result.playerstats
}

export interface Stat {
  name: string,
  value: number
}

export async function getUserStatsForGame(steamid: SteamID, appid: number) {
  const id = steamid instanceof SteamIdentifier ? steamid.id64 : SteamIdentifier.normalizeSteamID(steamid).id64;
  const url = endpoint + `ISteamUserStats/GetUserStatsForGame/v0002?steamid=${id}&appid=${appid}` + key;
  const req = await fetch(url);
  const result: {
    playerstats: {
      steamID: string,
      gameName: string,
      stats: Stat[],
      achievements: {
        name: string,
        achieved: number
      }[]
    }
  } = await req.json();
  return result.playerstats
}

export interface OwnedGame {
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

export async function getOwnedGames(steamid: SteamID, options?: Partial<{
  /** @description Include game name and logo information in the output. The default is to return appids only. */
  include_appinfo: boolean,
  /** @description By default, free games like Team Fortress 2 are excluded (as technically everyone owns them). If include_played_free_games is set, they will be returned if the player has played them at some point. This is the same behavior as the games list on the Steam Community. */
  include_played_free_games: boolean
}>) {
  const id = steamid instanceof SteamIdentifier ? steamid.id64 : SteamIdentifier.normalizeSteamID(steamid).id64;
  const url = endpoint + `IPlayerService/GetOwnedGames/v0001?steamid=${id}${options?.include_appinfo ? `&include_appinfo=1` : ''}${options?.include_played_free_games ? `&include_played_free_games=1`: ''}` + key;
  const req = await fetch(url);
  const result: {
    response: {
      /** @description the total number of games the user owns (including free games they've played, if include_played_free_games was passed) */
      game_count: number,
      /** @description A games array, with the following contents (note that if "include_appinfo" was not passed in the request, only appid, playtime_2weeks, and playtime_forever will be returned) */
      games: OwnedGame[]
    }
  } = await req.json();
  return result.response;
}

export interface RecentGame {
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

export async function getRecentlyPlayedGames(steamid: SteamID, count?: number) {
  const id = steamid instanceof SteamIdentifier ? steamid.id64 : SteamIdentifier.normalizeSteamID(steamid).id64;
  const url = endpoint + `IPlayerService/GetRecentlyPlayedGames/v0001?steamid=${id}${count ? `&count=${count}` : ''}` + key;
  const req = await fetch(url);
  const result: {
    response: {
      /** @description  the total number of unique games the user has played in the last two weeks. This is mostly significant if you opted to return a limited number of games with the count input parameter */
      total_count: number,
      /** @description A games array, with the following contents: */
      games: RecentGame[]
    }
  } = await req.json();
  return result.response;
}