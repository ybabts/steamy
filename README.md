# Steamy
Steamy is a library made to help interact with Valve's REST APIs for their various games and services by providing easy asynchronous functions to call them, along with a key manager, and type checking to boot. This module was made for use with ____Deno____ and you can import it with the line below.
```ts
// I love Deno's web imports
import * as steamy from "https://deno.land/x/steamy@v0.04/mod.ts"
```
In order to make any API calls, you'll need to set your API keys with the `setAPIKeys` function. You can set any of the API keys at a time, but if you don't have a proper API key set you won't be able to make any calls that require it.
```ts
// Here's an example of importing from an environmental variable
steamy.setAPIKeys({
  steam: Deno.env.get('steam_api_key')
});
```
Once you have your API keys set, you're good to start making any API calls with Steamy. Here's a quick example of an API call you can make with Steamy.
```ts
// This will fetch a list of users this person is friends with
const friends = await steamy.Steam.getFriendList(291312264);
```
Something cool about Steamy is that it automatically converts the Steam ID you give it to the correct format. For example I gave it `291312264` which is in the SteamID32 format, but typically the `getFriendList` API requires you to use SteamID64. You can find the functions to convert SteamIDs under `steamy.Steam`.
```ts
steamy.Steam.normalizeSteamID(291312264)
// returned: {
//  id: "STEAM_0:0:145656132",
//  id3: "U:1:291312264",
//  id32: "291312264",
//  id64: "76561198251577992"
//}
```
There's also a class called SteamIdentifier that you can extend from that takes a SteamID and normalizes it.

# API Calls
There are a ton of API calls to document and implement, and the list is growing fast. If you want to see what API calls are implemented, check out the module on [deno.land/x/steamy](https://deno.land/x/steamy). Eventually when I implmement all the API calls I'll make a comprehensive list with more in-depth documentation.

# Games
Since Valve makes games and have their own API calls for them, for example Dota 2, I thought it would be convienent to have them in here as well. For now, it will just be Dota 2 and Steam Web API though.