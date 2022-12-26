import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"
import { PersonaState, CommunityVisibilityState, ProfileState, CountryCode, StateCode } from "../../Steam/types.ts";
import { normalizeSteamID, SteamID } from "../../Steam/SteamIdentifier.ts";

export async function getPlayerSummaries(steamids: (string | number)[]) {
  const url = new URL(endpoints.steam + 'ISteamUser/GetPlayerSummaries/v0002');
  url.searchParams.set('steamids', steamids.map(v => normalizeSteamID(v).id64).join(','));
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { response: { players: getPlayerSummaries_Result[] }} = await req.json().catch(e => { throw e; });
  return res.response.players;
}

export type getPlayerSummaries_Result = getPlayerSummaries_ResultPublic & Partial<getPlayerSummaries_ResultPrivate>;

export interface getPlayerSummaries_ResultPublic {
  /** 64bit SteamID of the user */
  steamid: string;
  /** The player's persona name (display name) */
  personaname: string;
  /** The full URL of the player's Steam Community profile. */
  profileurl: string;
  /** The full URL of the player's 32x32px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatar: string;
  /** The full URL of the player's 64x64px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatarmedium: string;
  /** The full URL of the player's 184x184px avatar. If the user hasn't configured an avatar, this will be the default ? avatar. */
  avatarfull: string;
  /** The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play. If the player's profile is private, this will always be "0", except is the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private. */
  personastate: PersonaState;
  /** This represents whether the profile is visible or not, and if it is visible, why you are allowed to see it. Note that because this WebAPI does not use authentication, there are only two possible values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile is "Public", and the data is visible. Mike Blaszczak's post on Steam forums says, "The community visibility state this API returns is different than the privacy state. It's the effective visibility state from the account making the request to the account being viewed given the requesting account's relationship to the viewed account." */
  communityvisibilitystate: CommunityVisibilityState;
  /** If set, indicates the user has a community profile configured (will be set to '1') */
  profilestate: ProfileState;
  /** The last time the user was online, in unix time. */
  lastlogoff: number;
  /** If set, indicates the profile allows public comments. */
  commentpermission: number;
}

export interface getPlayerSummaries_ResultPrivate {
  /** The player's "Real Name", if they have set it. */
  realname: string;
  /** The player's primary group, as configured in their Steam Community profile. */
  primaryclanid: string;
  /** The time the player's account was created. */
  timecreated: number;
  /** If the user is currently in-game, this value will be returned and set to the gameid of that game. */
  gameid: string;
  /** The ip and port of the game server the user is currently playing on, if they are playing on-line in a game using Steam matchmaking. Otherwise will be set to "0.0.0.0:0". */
  gameserverip: string;
  /** If the user is currently in-game, this will be the name of the game they are playing. This may be the name of a non-Steam game shortcut. */
  gameextrainfo: string;
  /** This value will be removed in a future update (see loccityid) */
  cityid: number;
  /** If set on the user's Steam Community profile, The user's country of residence, 2-character ISO country code */
  loccountrycode: CountryCode;
  /** If set on the user's Steam Community profile, The user's state of residence */
  locstatecode?: StateCode;
  /** 
   * An internal code indicating the user's city of residence. A future update will provide this data in a more useful way.
    steam_location gem/package makes player location data readable for output.
    An updated readable list can be found at quer's steam location
    Getting locstatecode and loccityid, can now be done from https://steamcommunity.com/actions/QueryLocations/<loccountrycode>/<locstatecode>/
  */
  loccityid?: number;
}