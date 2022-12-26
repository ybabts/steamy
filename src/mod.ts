
export const apiKeys = {
  steam: null as string | null,
  opendota: null as string | null,
  stratz: null as string | null
}
export function setAPIKeys(keys: Partial<typeof apiKeys>): void {
  if(typeof keys.steam === 'string') apiKeys.steam = keys.steam;
  if(typeof keys.opendota === 'string') apiKeys.opendota = keys.opendota;
  if(typeof keys.stratz === 'string') apiKeys.stratz = keys.stratz;
}
export const endpoints = {
  steam: 'https://api.steampowered.com/',
  opendota: 'https://api.opendota.com/',
  stratz: 'https://api.stratz.com/' as string | null
}

export * as Steam from './Steam/mod.ts';
export * as Dota2 from './Dota2/mod.ts';