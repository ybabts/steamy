import { JSX } from "https://esm.sh/preact@10.11.0";
import { Heroes } from "../data/Heroes.ts";

export interface HeroIcon_Props {
  hero_id: number;
}

export function HeroIcon(props: JSX.HTMLAttributes<HTMLImageElement> & HeroIcon_Props) {
  return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/${Heroes[props.hero_id].name.slice(14)}.png`} />
}