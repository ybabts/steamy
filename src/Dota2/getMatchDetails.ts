import { apiKeys, endpoints } from "../mod.ts";
import { Engine, GameMode, HeroID, ItemID, LeaverStatus, LobbyType } from "./types.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

export async function getMatchDetails(match_id: number | string) {
  const url = new URL(endpoints.steam + 'IDOTA2Match_570/GetMatchDetails/v1');
  url.searchParams.set('match_id', match_id.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { result: getMatchDetails_Result } = await req.json().catch(e => { throw e; });
  return res.result;
}

export interface getMatchDetails_Result {
  /** List of players in the match */
  players: getMatchDetails_Player[];
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
    hero_id: HeroID;
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

export interface getMatchDetails_Player {
  /** 32-bit account ID */
  account_id: number;
  /** See #Player Slot below */
  player_slot: number;
  /** The hero's unique ID. A list of hero IDs can be found via the GetHeroes method. */
  hero_id: HeroID;
  /** ID of the top-left inventory item */
  item_0: ItemID;
  /** ID of the top-center inventory item */
  item_1: ItemID;
  /** ID of the top-right inventory item */
  item_2: ItemID;
  /** ID of the bottom-left inventory item */
  item_3: ItemID;
  /** ID of the bottom-center inventory item */
  item_4: ItemID;
  /** ID of the bottom-right inventory item */
  item_5: ItemID;
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
    item_0: ItemID;
    /** ID of the top-center inventory item */
    item_1: ItemID;
    /** ID of the top-right inventory item */
    item_2: ItemID;
    /** ID of the bottom-left inventory item */
    item_3: ItemID;
    /** ID of the bottom-center inventory item */
    item_4: ItemID;
    /** ID of the bottom-right inventory item */
    item_5: ItemID;
  }[];
}