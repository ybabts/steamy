import { apiKeys, endpoints } from "../../mod.ts";
import { GameMode, HeroID, LobbyType } from "../types.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"

export async function getTopLiveGame(partner: number | string) {
  const url = new URL(endpoints.steam + 'IDOTA2Match_570/GetTopLiveGame/v1');
  url.searchParams.set('partner', partner.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: getTopLiveGame_Result = await req.json().catch(e => { throw e; });
  return res;
}

export interface getTopLiveGame_Result {
  search_key: string;
  league_id: number;
  hero_id: HeroID;
  start_game: number;
  num_games: number;
  game_list_index: number;
  game_list: getTopLiveGame_Game[];
}

export interface getTopLiveGame_Game {
  activate_time: number;
  deactivate_time: number;
  server_steam_id: string;
  lobby_id: string;
  league_id: number;
  lobby_type: LobbyType;
  game_time: number;
  delay: number;
  spectators: number;
  game_mode: GameMode;
  average_mmr: number;
  match_id: string;
  series_id: number;
  team_name_radiant: string;
  team_name_dire: string;
  team_logo_radiant: string;
  team_logo_dire: string;
  team_id_radiant: number;
  team_id_dire: number;
  sort_score: number;
  last_update_time: number;
  radiant_lead: number;
  radiant_score: number;
  dire_score: number;
  players: getTopLiveGame_Player[];
  building_state: number;
  weekend_tourney_tournament_id: number;
  weekend_tourney_division: number;
  weekend_tourney_skill_level: number;
  weekend_tourney_bracket_round: number;
  custom_game_difficulty: number;
}

export interface getTopLiveGame_Player {
  account_id: number;
  hero_id: HeroID;
}