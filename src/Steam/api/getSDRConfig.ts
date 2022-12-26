import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts";

/** Presence of a Steam Web API key will display all available methods & interfaces allowed for that key. */
export async function getSDRConfig(appid: number) {
  const url = new URL(endpoints.steam + 'ISteamApps/GetSDRConfig/v2');
  url.searchParams.set('appid', appid.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: getSDRConfig_Result = await req.json().catch(e => { throw e; });
  return res;
}

export interface getSDRConfig_Result {
  revision: number;
  pops: Record<string,getSDRConfig_Pop>
  certs: string[];
  p2p_share_ip: {
    cn: number;
    default: number;
    ru: number;
  };
  relay_public_key: string;
  revoked_keys: string[];
  typical_pings: [string, string, number][];
  success: boolean;
}

export interface getSDRConfig_Pop {
  desc: string;
  geo: [
    /** Latitude */
    number,
    /** Longitude */
    number
  ],
  /** I suspect this aligns with Dota2's getTopLiveGame partner parameter */
  partners: number;
  relay_public_key: string;
  tier: number;
  relays: getSDRConfig_Relay[]
}

export interface getSDRConfig_Relay {
  ipv4: string,
  port_range: [
    /** Start of Range */
    number,
    /** End of Range */
    number
  ]
}