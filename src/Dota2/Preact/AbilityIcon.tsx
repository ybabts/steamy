import { JSX } from "https://esm.sh/preact@10.11.0";
import { Abilities } from "../data/Abilities.ts";

export interface AbilityIcon_Props {
  ability_id: number;
}

export function AbilityIcon(props: JSX.HTMLAttributes<HTMLImageElement> & AbilityIcon_Props) {
  return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${Abilities[props.ability_id].name}.png`} />
}