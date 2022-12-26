import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "x/https_status_codes@v1.2.0/mod.ts"

export interface getNewsForApp_Options {
  maxlength: number;
  enddate: number;
  count: number;
  feeds: string;
}

export async function getNewsForApp(appid: number, options?: Partial<getNewsForApp_Options>) {
  const url = new URL(endpoints.steam + 'ISteamNews/GetNewsForApp/v0002');
  if(options !== undefined)
    for(const [key, value] of Object.entries(options))
      url.searchParams.set(key, value.toString());
  url.searchParams.set('appid', appid.toString());
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { appnews: getNewsForApp_Result } = await req.json().catch(e => { throw e; });
  return res.appnews;
}

export interface getNewsForApp_Result {
  /** The appid of the item news is fetched for. */
  appid: number;
  /** A list of objects describing each news item. */
  newsitems: getNewsForApp_NewsItem[];
}

export interface getNewsForApp_NewsItem {
  /** The unique identifier of the news item. */
  gid: string;
  /** Title of the news item. */
  title: string;
  /** Permanent link to the item */
  url: string;
  /** true if the url given links to an external website. false if it links to the Steam store. */
  is_external_url: boolean;
  /** The author of the news item. */
  author: string;
  /** The article body with a length equal to the given length with an appended ellipsis if it is exceeded. */
  contents: string;
  /** The category label of the news item. */
  feedlabel: string;
  /** A unix timestamp of the date the item was posted. */
  date: number;
  /** An internal tag that describes the source of the news item. */
  feedname: string;
  feed_type: number;
  /** The appid of the news item */
  appid: number;
}