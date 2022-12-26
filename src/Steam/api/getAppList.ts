import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

export async function getAppList() {
  const url = new URL(endpoints.steam + 'ISteamApps/GetAppList/v2');
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { applist: { apps: getAppList_App[] } } = await req.json().catch(e => { throw e; });
  return res.applist.apps;
}

export interface getAppList_App {
  appid: number;
  name: string;
}