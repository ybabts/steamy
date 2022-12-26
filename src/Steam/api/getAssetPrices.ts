import { apiKeys, endpoints } from "../../mod.ts";
import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"

export interface getAssetPrices_Options {
  /** The ISO639-1 language code for the language all localized strings should be returned in. Not all strings have been translated to every language. If a language does not have a string, the English string will be returned instead. If this parameter is omitted the string token will be returned for the strings. */
  language: string;
  /** The ISO 4217 code for currency specific filtering. */
  currency: string;
}

/**  All prices are given as integers due to issues regarding precision. A double value can be obtained by dividing the price by 100.
 Note that for first party (Valve) games there may be a def_index property present, its value is a string that can be converted to an integer for use in schema item lookups. */
export async function getAssetPrices(appid: number, options?: Partial<getAssetPrices_Options>) {
  const url = new URL(endpoints.steam + 'ISteamEconomy/GetAssetPrices/v0001');
  url.searchParams.set('appid', appid.toString());
  if(options?.language) url.searchParams.set('language', options.language);
  if(options?.currency) url.searchParams.set('currency', options.currency);
  if(apiKeys.steam === null) throw new Error('cannot make api call: unauthorized');
  url.searchParams.set('key', apiKeys.steam);
  const req = await fetch(url);
  if(req.status !== StatusCodes.OK) throw new Error(await req.text());
  const res: { result: getAssetPrices_Result } = await req.json().catch(e => { throw e; });
  return res.result;
}

export interface getAssetPrices_Result {
  /** true if the query was successful, false otherwise. */
  success: boolean,
  /** A list of items with slot tags and prices in the chosen or all currency. */
  assets: getAssetPrices_Asset[]
}

export type getAssetPrices_Price = Record<string,number>

export interface getAssetPrices_Asset {
  /** An array containing the currency code and respective price, if a currency is specified only that currency value will be present.  */
  prices: getAssetPrices_Price;
  /** An array equivalent to prices in layout. Present when the item is on sale. */
  original_prices?: getAssetPrices_Price;
  /** A list of properties attached to the item  */
  class: getAssetPrices_Class[];
  /** The "name" of the asset. This has no set content besides that it is an identifier that can be used in URLs such as those for Valve's store frontend. */
  name: string;
  
  date: string;
  /** The class ID of the item. */
  classid: string;
}

export interface getAssetPrices_Class {
  /** The name of the property. */
  name: string;
  /** The value of the property. */
  value: string;
}