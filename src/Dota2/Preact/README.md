## Preact Support
Since this library is most useful for building a website that implements Steam's API calls, I figured it would be great to provide some basic components for assets like Hero Icons, Portraits, Abilities, Items etc. You can import them with the following snippet.
```ts
import * as Dota2React from "https://deno.land/x/steamy@v0.05a/Dota2/React/mod.ts"
```
Currently we have `AbilityIcon`, `HeroIcon`, `HeroPortrait`, and `ItemIcon` available. They all extend from `HTMLImageElement` so you can just treat them like any image apart from their provided properties. Here's an example of using them in another Preact component.
```tsx
import { HeroPortrait, AbilityIcon } from "https://deno.land/x/steamy@v0.05a/Dota2/React/mod.ts"
import { HeroID, AbilityID } from "https://deno.land/x/steamy@v0.05a/Dota2/types.ts"

<div class="flex children:(m-4)">
  <HeroPortrait hero_id={HeroID.Enigma} />
  <AbilityIcon ability_id={AbilityID.enigma_malefice} />
  <AbilityIcon ability_id={AbilityID.enigma_demonic_conversion} />
  <AbilityIcon ability_id={AbilityID.enigma_midnight_pulse} />
  <AbilityIcon ability_id={AbilityID.enigma_black_hole} />
</div>
```