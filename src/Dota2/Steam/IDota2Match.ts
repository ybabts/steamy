import { SteamIdentifier } from "../../mod.ts";
import { endpoint, Engine, GameMode, LeaverStatus, LobbyType, Skill, Status } from "./mod.ts";

type SteamID = SteamIdentifier | string | number;

const key = `&key=${Deno.env.get('steam_api_key')}`;

export interface Match {
  /** @description The matches unique ID. */
  match_id: number;
  /** @description A 'sequence number', representing the order in which matches were recorded. */
  match_seq_num: number;
  /** @description Unix timestamp of when the match began. */
  start_time: number;
  lobby_type: LobbyType;
  /** @description The list of players within the match. */
  players: Player[]
}

export interface Player {
  /** @description 32-bit account ID. */
  account_id: number;
  /**
   * @description A player's slot is returned via an 8-bit unsigned integer. The first bit represent the player's team, false if Radiant and true if dire. The final three bits represent the player's position in that team, from 0-4.
   *    ┌─────────────── Team (false if Radiant, true if Dire).
   *    │ ┌─┬─┬─┬─────── Not used.
   *    │ │ │ │ │ ┌─┬─┬─ The position of a player within their team (0-4).
   *    │ │ │ │ │ │ │ │
   *    0 0 0 0 0 0 0 0
   */
  player_slot: number;
  /** @description The hero's unique ID. A list of hero IDs can be found via the GetHeroes method. */
  hero_id: number;
}

export async function getMatchHistory(options?: Partial<{
  /** @description A list of hero IDs can be found via the GetHeroes method. */
  hero_id: number,
  game_mode: GameMode,
  /** @description Skill bracket for the matches (Ignored if an account ID is specified). */
  skill: Skill,
  /** @description Minimum amount of players in a match for the match to be returned. */
  min_players: number,
  /** @description 32-bit or 64-bit account ID. */
  account_id: SteamID,
  /** @description Only return matches from this league. A list of league IDs can be found via the GetLeagueListing method. */
  league_id: number,
  /** @description Start searching for matches equal to or older than this match ID. */
  start_at_match_id: number,
  /** @description Amount of matches to include in results (default: 25). */
  matches_requested: number,
  /** @description Whether to limit results to tournament matches. (0 = false, 1 = true) */
  tournament_games_only: boolean
}>) {
  const url = endpoint + `IDOTA2Match_570/GetMatchHistory/v1?`
    + ( options?.hero_id ? `&hero_id=${options?.hero_id}` : '' )
    + ( options?.game_mode ? `&game_mode=${options?.game_mode}` : '' )
    + ( options?.skill ? `&skill=${options?.skill}` : '' )
    + ( options?.min_players ? `&min_players=${options?.min_players}` : '' )
    + ( options?.account_id ? `&account_id=${options?.account_id instanceof SteamIdentifier ? options?.account_id.id64 : SteamIdentifier.normalizeSteamID(options?.account_id!).id64}` : '' )
    + ( options?.league_id ? `&league_id=${options?.league_id}` : '' )
    + ( options?.start_at_match_id ? `&start_at_match_id=${options?.start_at_match_id}` : '' )
    + ( options?.matches_requested ? `&matches_requested=${options?.matches_requested}` : '' )
    + ( options?.tournament_games_only ? `&tournament_games_only=${options?.tournament_games_only}` : '' )
    + key;
  const req = await fetch(url);
  const result: {
    result: {
      status: Status,
      /** @description A message explaining the status, should status not be 1. */
      statusDetail: string,
      /** @description The number of matches in this response. */
      num_results: number,
      /** @description The total number of matches for the query. */
      total_results: number,
      /** @description The number of matches left for this query. */
      results_remaining: number;
      /** @description A list of matches. */
      matches: Match[]
    }
  } = await req.json();
  return result.result;
}

interface PlayerDetail {
  /** 32-bit account ID */
  account_id: number;
  /** See #Player Slot below */
  player_slot: number;
  /** The hero's unique ID. A list of hero IDs can be found via the GetHeroes method. */
  hero_id: number;
  /** ID of the top-left inventory item */
  item_0: number;
  /** ID of the top-center inventory item */
  item_1: number;
  /** ID of the top-right inventory item */
  item_2: number;
  /** ID of the bottom-left inventory item */
  item_3: number;
  /** ID of the bottom-center inventory item */
  item_4: number;
  /** ID of the bottom-right inventory item */
  item_5: number;
  /** The amount of kills attributed to this player */
  kills: number;
  /** The amount of times this player died during the match */
  deaths: number;
  /** The amount of assists attributed to this player */
  assists: number;
  /**
   * 0 - NONE - finished match, no abandon.
   * 1 - DISCONNECTED - player DC, no abandon.
   * 2 - DISCONNECTED_TOO_LONG - player DC > 5min, abandoned.
   * 3 - ABANDONED - player DC, clicked leave, abandoned.
   * 4 - AFK - player AFK, abandoned.
   * 5 - NEVER_CONNECTED - player never connected, no abandon.
   * 6 - NEVER_CONNECTED_TOO_LONG - player took too long to connect, no abandon.
   */
  leaver_status: LeaverStatus;
  /** The amount of last-hits the player got during the match */
  last_hits: number;
  /** The amount of denies the player got during the match */
  denies: number;
  /** The player's overall gold/minute */
  gold_per_min: number;
  /** The player's overall experience/minute */
  xp_per_min: number;
  /** Additional playable units owned by the player (only present if there is another unit owned by the player) */
  additional_units?: {
    /** The name of the unit */
    unitname: string;
    /** ID of the top-left inventory item */
    item_0: number;
    /** ID of the top-center inventory item */
    item_1: number;
    /** ID of the top-right inventory item */
    item_2: number;
    /** ID of the bottom-left inventory item */
    item_3: number;
    /** ID of the bottom-center inventory item */
    item_4: number;
    /** ID of the bottom-right inventory item */
    item_5: number;
  }[];
}

export async function getMatchDetails(matchid: number | string) {
  const url = endpoint + `IDOTA2Match_570/GetMatchDetails/v1?match_id=${matchid}` + key;
  const req = await fetch(url);
  const result: {
    result: {
      /** List of players in the match */
      players: PlayerDetail[];
      /** The season the game was played in */
      season: number;
      /** Dictates the winner of the match, true for radiant; false for dire */
      radiant_win: boolean;
      /** The length of the match, in seconds since the match began */
      duration: number;
      /** ? */
      pre_game_duration: number;
      /** Unix timestamp of when the match began */
      start_time: number;
      /** The match's unique ID */
      match_id: number;
      /** A 'sequence number', representing the order in which matches were recorded */
      match_seq_num: number;
      /** See #Tower Status below */
      tower_status_radiant: number;
      /** See #Tower Status below */
      tower_status_dire: number;
      /** See #Barracks Status below */
      barracks_status_radiant: number;
      /** See #Barracks Status below */
      barracks_status_dire: number;
      /** The server cluster the match was played upon. Used for downloading replays of matches. Can be translated to region using dota constants (https://github.com/odota/dotaconstants) */
      cluster: number;
      /** The time in seconds since the match began when first-blood occurred */
      first_blood_time: number;
      /**
       * -1 - Invalid
       * 0 - Public matchmaking
       * 1 - Practise
       * 2 - Tournament
       * 3 - Tutorial
       * 4 - Co-op with bots.
       * 5 - Team match
       * 6 - Solo Queue
       * 7 - Ranked
       * 8 - 1v1 Mid
       */
      lobby_type: LobbyType;
      /** The number of human players within the match */
      human_players: number;
      /** The league that this match was a part of. A list of league IDs can be found via the GetLeagueListing method */
      leagueid: number;
      /** The number of thumbs-up the game has received by users */
      positive_votes: number;
      /** The number of thumbs-down the game has received by users */
      negative_votes: number;
      /**
       * 0 - None
       * 1 - All Pick
       * 2 - Captain's Mode
       * 3 - Random Draft
       * 4 - Single Draft
       * 5 - All Random
       * 6 - Intro
       * 7 - Diretide
       * 8 - Reverse Captain's Mode
       * 9 - The Greeviling
       * 10 - Tutorial
       * 11 - Mid Only
       * 12 - Least Played
       * 13 - New Player Pool
       * 14 - Compendium Matchmaking
       * 15 - Co-op vs Bots
       * 16 - Captains Draft
       * 18 - Ability Draft
       * 20 - All Random Deathmatch
       * 21 - 1v1 Mid Only
       * 22 - Ranked Matchmaking
       * 23 - Turbo Mode
       */
      game_mode: GameMode;
      /** A list of picks and bans in the match, including the order and the hero ID */
      picks_bans: {
        /** The hero ID being picked or banned */
        hero_id: number;
        /** The team that is picking or banning */
        team: number;
        /** The order of the pick or ban */
        order: number;
        /** Whether the hero was picked or banned (1 for pick, 0 for ban) */
        is_pick: number;
      }[];
      /**
       * 0 - Source 1
       * 1 - Source 2
       */
      engine: Engine,
      /** Radiant kills */
      radiant_score: number;
      /** Dire kills */
      dire_score: number;
    }
  } = await req.json();
  return result.result;
}

