## ResolveVanityURL
This API call is pretty standard when building websites for end users, most people don't remember their SteamID unless they're freaks. So Steam allows you to set a vanity URL to make it easier to share your profile page. For example Gabe Newell's Steam ID is 22202 and the link to his Steam profile would be this.
> https://steamcommunity.com/profiles/76561197960287930
But with a vanity URL, his profile is able to have this instead.
> https://steamcommunity.com/id/GabeLoganNewell/

The only problem with this is that we can't use a vanity URL for our API calls, we have to use their actual Steam ID. Luckily there's an API call to resolve their vanity URL. You can call it using the following code.
```ts
import * as Steam from "https://deno.land/x/steamy@v0.05a/Steam/mod.ts";

const req = await Steam.resolveVanityURL('GabeLoganNewell');
const steamid = req.steamid;
// steamid: 76561197960287930
```
This will always return a SteamID64 formatted SteamID. So if you need to use SteamID32, you can then convert between other SteamIDs with the following snippet.
```ts
const steamid32 = Steam.normalizeSteamID(steamid).id32
// steamid32: 22202
```
