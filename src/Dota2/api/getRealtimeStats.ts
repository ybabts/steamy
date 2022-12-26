import { apiKeys, endpoints } from "../../mod.ts";
import { AbilityID, GameMode, HeroID, ItemID, LobbyType } from "../types.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

export async function getRealtimeStats(server_steam_id: string) {
  const url = new URL(endpoints.steam + 'IDOTA2MatchStats_570/GetRealtimeStats/v1');
  url.searchParams.set('server_steam_id', server_steam_id);
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: getRealtimeStats_Result = await req.json().catch(e => { throw e; });
  return res;
}

export interface getRealtimeStats_Result {
  match: getRealtimeStats_Match,
  teams: getRealtimeStats_Team[],
  buildings: getRealtimeStats_Building[],
  graph_data: {
    graph_gold: number[]
  }
}

export interface getRealtimeStats_Match {
  /** The Steam ID of the server where the match was played. */
  server_steam_id: string;
  /** The unique ID of the match. */
  match_id: string;
  /** The timestamp of when the match was played. */
  timestamp: number;
  /** The length of the match in seconds. */
  game_time: number;
  /** The game mode of the match. */
  game_mode: GameMode;
  /** The ID of the league the match was played in (if applicable). */
  league_id: number;
  /** The node ID of the league the match was played in (if applicable). */
  league_node_id: number;
  /** The current state of the match. */
  game_state: number;
  /** The type of lobby the match was played in. */
  lobby_type: LobbyType;
  /** The timestamp of when the match started. */
  start_timestamp: number;
}

export interface getRealtimeStats_Team {
  /** The number of the team (1 or 2). */
  team_number: number;
  /** The ID of the team. */
  team_id: number;
  /** The name of the team. */
  team_name: string;
  /** The tag of the team. */
  team_tag: string;
  /** The logo of the team. */
  team_logo: string;
  /** The score of the team. */
  score: number;
  /** The net worth of the team. */
  net_worth: number;
  /** The URL of the team's logo. */
  team_logo_url: string;
  /** An array of player objects for the team. */
  players: GetRealtimeStats_Player[]
}

export interface GetRealtimeStats_Player {
  /** The account ID of the player. */
  accountid: number;
  /** The ID of the player. */
  playerid: number;
  /** The name of the player. */
  name: string;
  /** The number of the team the player is on (1 or 2). */
  team: number;
  /** The ID of the hero the player is playing. */
  heroid: HeroID;
  /** The level of the hero the player is playing. */
  level: number;
  /** The number of kills the player has. */
  kill_count: number;
  /** The number of deaths the player has. */
  death_count: number;
  /** The number of assists the player has. */
  assists_count: number;
  /** The number of denies the player has. */
  denies_count: number;
  /** The number of last hits the player has. */
  lh_count: number;
  /** The amount of gold the player has. */
  gold: number;
  /** The x coordinate of the player's position on the map. This seems to be the percent from the center of the map. Left is negative. Right is positive. */
  x: number;
  /** The y coordinate of the player's position on the map. This seems to be the percent from the center of the map. Top is positive. Bottom is negative*/
  y: number;
  /** The net worth of the player. */
  net_worth: number;
  /** An array of ability IDs for the player's hero. */
  abilities: AbilityID[];
  /** An array of item IDs for the player's hero. */
  items: ItemID[];
}

export interface getRealtimeStats_Building {
  /** The number of the team the building belongs to (1 or 2). */
  team: number;
  /** The heading of the building. */
  heading: number;
  /** The type of the building. */
  type: number;
  /** The lane the building is located in. */
  lane: number;
  /** The tier of the building. */
  tier: number;
  /** The x coordinate of the building's position on the map. */
  x: number;
  /** The y coordinate of the building's position on the map. */
  y: number;
  /** A boolean indicating whether the building has been destroyed. */
  destroyed: boolean;
}