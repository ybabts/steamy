import { assertEquals, fail } from 'std/testing/asserts.ts';
import SteamIdentifier from "src/SteamIdentifier.ts";

Deno.test("fn.normalizeSteamID > throw error on improper ID3 format", () => {
  try {
    SteamIdentifier.normalizeSteamID('U:15156666');
    fail();
  } catch(e) {
    assertEquals(e instanceof Error, true);
  }
});

Deno.test("fn.normalizeSteamID > don't throw error on proper ID3 format", () => {
  try {
    SteamIdentifier.normalizeSteamID('U:1:291312264');
  } catch(e) {
    fail(e);
  }
});

Deno.test("fn.SteamID3 normalization > SteamID", () => assertEquals(SteamIdentifier.normalizeSteamID('U:1:100758751').id, 'STEAM_0:1:50379375'));
Deno.test("fn.SteamID3 normalization > SteamID3", () => assertEquals(SteamIdentifier.normalizeSteamID('U:1:100758751').id3, 'U:1:100758751'));
Deno.test("fn.SteamID3 normalization > SteamID32", () => assertEquals(SteamIdentifier.normalizeSteamID('U:1:100758751').id32, '100758751'));
Deno.test("fn.SteamID3 normalization > SteamID64", () => assertEquals(SteamIdentifier.normalizeSteamID('U:1:100758751').id64, '76561198061024479'));

Deno.test("fn.SteamID32 normalization > SteamID", () => assertEquals(SteamIdentifier.normalizeSteamID('221531503').id, 'STEAM_0:1:110765751'));
Deno.test("fn.SteamID32 normalization > SteamID3", () => assertEquals(SteamIdentifier.normalizeSteamID('221531503').id3, 'U:1:221531503'));
Deno.test("fn.SteamID32 normalization > SteamID32", () => assertEquals(SteamIdentifier.normalizeSteamID('221531503').id32, '221531503'));
Deno.test("fn.SteamID32 normalization > SteamID64", () => assertEquals(SteamIdentifier.normalizeSteamID('221531503').id64, '76561198181797231'));

Deno.test("fn.SteamID64 normalization > SteamID", () => assertEquals(SteamIdentifier.normalizeSteamID('76561198068690005').id, 'STEAM_0:1:54212138'));
Deno.test("fn.SteamID64 normalization > SteamID3", () => assertEquals(SteamIdentifier.normalizeSteamID('76561198068690005').id3, 'U:1:108424277'));
Deno.test("fn.SteamID64 normalization > SteamID32", () => assertEquals(SteamIdentifier.normalizeSteamID('76561198068690005').id32, '108424277'));
Deno.test("fn.SteamID64 normalization > SteamID64", () => assertEquals(SteamIdentifier.normalizeSteamID('76561198068690005').id64, '76561198068690005'));