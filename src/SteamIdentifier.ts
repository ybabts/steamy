
export default class SteamIdentifier {
  /** @description The standard Steam id format. STEAM_0:1:XXXXXXXX */
  id!: string;
  /** @description The user indicator id format, almost identicle to id32. U:1:XXXXXXXXX */
  id3!: string;
  /** @description The friend id format, a 32 bit integer. */
  id32!: string;
  /** @description The community id format, a 64 bit integer. */
  id64!: string;
  /**
   * @todo Currently does not work with the standard ID, I don't know how to convert it.
   * @implements {normalizeSteamID}
   * @returns A SteamIdentifier object with all the SteamIdentifier values.
  */
  constructor(steamid: string | number) {
    Object.assign(this, SteamIdentifier.normalizeSteamID(steamid));
  }
  static normalizeSteamID(steamid: number | string) {
    if(steamid === undefined) throw new TypeError(`Argument steamid is ${steamid}. Expected coercible string.`);
    if(steamid === null) throw new TypeError(`Argument steamid is ${steamid}. Expected coercible string.`);
    if(isNaN(Number(steamid)) && !/^U:1:*/.test(steamid.toString())) throw new SyntaxError(`Argument steamid is ${steamid}, is non-numeric or is not following ID3 formatting.`);
    if(/^U:1:*/.test(steamid.toString())) return SteamIdentifier.normalizeFromID3(steamid.toString());
    if(BigInt(steamid) < 76561197960265728n) return SteamIdentifier.normalizeFromID32(Number(steamid));
    if(BigInt(steamid) > 76561197960265728n) return SteamIdentifier.normalizeFromID64(BigInt(steamid));
    throw new Error(`Arguement steamid is ${steamid}, expected valid SteamIdentifier.`);
  }
  static normalizeFromID32(steamid: number) {
    return {
        id: SteamIdentifier.convertID64toID(BigInt(steamid) + 76561197960265728n),
        id3: `U:1:${steamid}`,
        id32: String(steamid),
        id64: String(BigInt(steamid) + 76561197960265728n)
    }
  }
  static normalizeFromID64(steamid: bigint) {
    return {
        id: SteamIdentifier.convertID64toID(steamid),
        id3: `U:1:${BigInt(steamid) - 76561197960265728n}`,
        id32: String(BigInt(steamid) - 76561197960265728n),
        id64: String(steamid)
    }
  }
  static normalizeFromID3(steamid: string) {
    return SteamIdentifier.normalizeFromID32(Number(steamid.substring(4)));
  }
  static convertID64toID(steamid: bigint) {
    const bin = steamid.toString(2).substring(1,63).padStart(64,'0');
    const x = parseInt(bin.slice(0, 8), 2);
    const y = parseInt(bin.slice(63), 2);
    const z = parseInt(bin.slice(32, 63), 2);
    return `STEAM_${x}:${y}:${z}`;
  }
}