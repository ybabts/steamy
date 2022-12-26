import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

/** This API call seems to require an authorized API key to return the information */
export async function getServersAtAddress(address: string) {
  const url = new URL(endpoints.steam + 'ISteamApps/GetServersAtAddress/v1');
  url.searchParams.set('addr', address);
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { response: getServersAtAddress_Result } = await req.json().catch(e => { throw e; });
  return res.response;
}

export interface getServersAtAddress_Result {
  success: boolean;
  message?: string;
  /** A list of every server from this ip address. */
  servers: {
    /** Gives the ip address, and the port number. Ex: "64.94.100.204:27015" */
    addr: string;
    /** Gives the gmsindex. (?) Ex: 65534 */
    gmsindex: number;
    /** Gives the steam game appid. Ex: 730 */
    appid: number;
    /** Tells which directory the game is from. Ex: "csgo" */
    gamedir: string;
    /** Gives the region of the server. Ex: 1 */
    region: number;
    /** Boolean, if server is secure or not. Ex: true */
    secure: boolean;
    /** Boolean, if server is a lan game. Ex: false */
    lan: boolean;
    /** Gives the port number for the server. Ex: 27015 */
    gameport: number;
    /** Gives the specport. Ex: 0 */
    specport: number;
  }[];
}