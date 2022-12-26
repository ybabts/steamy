import { apiKeys, endpoints } from "src/mod.ts";
import { normalizeSteamID, SteamID } from "src/Steam/SteamIdentifier.ts";
import { GameMode, HeroID, LobbyType, Skill } from "src/Dota2/types.ts";
import { StatusCodes } from "x/https_status_codes"

export interface getMatchHistory_Parameters {
  /** A list of hero IDs can be found via the GetHeroes method. */
  hero_id: number,
  game_mode: GameMode,
  /** Skill bracket for the matches (Ignored if an account ID is specified). */
  skill: Skill,
  /** Minimum amount of players in a match for the match to be returned. */
  min_players: number,
  /** 32-bit or 64-bit account ID. */
  account_id: SteamID,
  /** Only return matches from this league. A list of league IDs can be found via the GetLeagueListing method. */
  league_id: number,
  /** Start searching for matches equal to or older than this match ID. */
  start_at_match_id: number,
  /** Amount of matches to include in results (default: 25). */
  matches_requested: number,
  /** Whether to limit results to tournament matches. (0 = false, 1 = true) */
  tournament_games_only: boolean
}

export async function getMatchHistory(options?: Partial<getMatchHistory_Parameters>) {
  const url = new URL(endpoints.steam + 'IDOTA2Match_570/GetMatchHistory/v1');
  if(options !== undefined)
    for(const [key, value] of Object.entries(options))
      url.searchParams.set(key, value.toString() === 'account_id' ? normalizeSteamID(value.toString()).id32 : value.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { result: getMatchHistory_Result } = await req.json().catch(e => { throw e; });
  return res.result;
}

export interface getMatchHistory_Result {
  status: getMatchHistory_Status,
  /** A message explaining the status, should status not be 1. */
  statusDetail: string,
  /** The number of matches in this response. */
  num_results: number,
  /** The total number of matches for the query. */
  total_results: number,
  /** The number of matches left for this query. */
  results_remaining: number;
  /** A list of matches. */
  matches: getMatchHistory_Match[]
}

export enum getMatchHistory_Status {
  /** Success */
  Success = 1,
  /** Cannot get match history for a user that hasn't allowed it. */
  Private = 15
}

export interface getMatchHistory_Match {
  /** The matches unique ID. */
  match_id: number;
  /** A 'sequence number', representing the order in which matches were recorded. */
  match_seq_num: number;
  /** Unix timestamp of when the match began. */
  start_time: number;
  lobby_type: LobbyType;
  radiant_team_id: number;
  dire_team_id: number;
  /** The list of players within the match. */
  players: getMatchHistory_Player[]
}

export interface getMatchHistory_Player {
  /** 32-bit account ID. */
  account_id: number;
  /**
   * A player's slot is returned via an 8-bit unsigned integer. The first bit represent
   * the player's team, false if Radiant and true if dire. The final three bits represent
   * the player's position in that team, from 0-4.
   *    ┌─────────────── Team (false if Radiant, true if Dire).
   *    │ ┌─┬─┬─┬─────── Not used.
   *    │ │ │ │ │ ┌─┬─┬─ The position of a player within their team (0-4).
   *    │ │ │ │ │ │ │ │
   *    0 0 0 0 0 0 0 0
   */
  player_slot: number;
  team_number: number;
  team_slot: number;
  /** The hero's unique ID. A list of hero IDs can be found via the GetHeroes method. */
  hero_id: HeroID;

}