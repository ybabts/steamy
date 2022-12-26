import { JSX } from "https://esm.sh/preact@10.11.0";
import { Items } from "../data/Items.ts";

export interface ItemIcon_Props {
  item_id: number;
}

export function ItemIcon(props: JSX.HTMLAttributes<HTMLImageElement> & ItemIcon_Props) {
  const name = Items[props.item_id].name.slice(5);
  if(name.includes('recipe')) return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/recipe.png`} />
  return <img {...props} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${name}.png`} />
}