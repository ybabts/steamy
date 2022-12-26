import { JSX } from "https://esm.sh/preact@10.11.0";

export interface HeroIcon_Props {
  hero_id: number;
}

export function HeroIcon(props: JSX.HTMLAttributes<HTMLImageElement> & HeroIcon_Props) {
  return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/${props.hero_id}.png`} />
}