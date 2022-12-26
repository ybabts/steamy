import { JSX } from "https://esm.sh/preact@10.11.0";
import { Heroes } from "../mod.ts";

export interface HeroPortrait_Props {
  hero_id: number;
}

export function HeroPortrait(props: JSX.HTMLAttributes<HTMLImageElement> & HeroPortrait_Props) {
  return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${Heroes[props.hero_id].name.slice(14)}.png`} />
}