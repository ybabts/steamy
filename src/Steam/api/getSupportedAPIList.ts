import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts";
import { HTTPMethod } from "../../mod.ts";

/** Presence of a Steam Web API key will display all available methods & interfaces allowed for that key. */
export async function getSupportedAPIList(key: string | null = apiKeys.steam) {
  const url = new URL(endpoints.steam + 'ISteamWebAPIUtil/GetSupportedAPIList/v0001');
  if(key !== null) url.searchParams.set('key', key);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { apilist: getSupportedAPIList_Result } = await req.json().catch(e => { throw e; });
  return res.apilist;
}

export interface getSupportedAPIList_Result {
  interfaces: getSupportedAPIList_Interface[];
}

export interface getSupportedAPIList_Interface {
  name: string;
  methods: getSupportedAPIList_Method[];
}

export interface getSupportedAPIList_Method {
  name: string;
  version: number;
  httpmethod: HTTPMethod,
  description: string;
  parameters: getSupportedAPIList_ResultParameters
}

export interface getSupportedAPIList_ResultParameters {
  name: string;
  type: string;
  optional: boolean;
  description: string;
}