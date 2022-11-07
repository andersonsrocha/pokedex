import { Pokemon, Typing } from "@types";
import * as Icons from "@icons";
import { WEAKNESS } from "@constants";
import classNames from "classnames";

export * from "./modifiers";

export function capitalize(str: string) {
  const arr = str.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }

  return arr.join(" ");
}

export function getType(pokemon: Pokemon, pos = 0) {
  const { types } = pokemon;
  return types[pos].type.name;
}

export function getTypeIcon(type: Typing) {
  switch (type) {
    case "bug":
      return Icons.BugIcon;
    case "dark":
      return Icons.DarkIcon;
    case "dragon":
      return Icons.DragonIcon;
    case "electric":
      return Icons.ElectricIcon;
    case "fairy":
      return Icons.FairyIcon;
    case "fighting":
      return Icons.FightingIcon;
    case "fire":
      return Icons.FireIcon;
    case "flying":
      return Icons.FlyingIcon;
    case "ghost":
      return Icons.GhostIcon;
    case "grass":
      return Icons.GrassIcon;
    case "ground":
      return Icons.GroundIcon;
    case "ice":
      return Icons.IceIcon;
    case "normal":
      return Icons.NormalIcon;
    case "poison":
      return Icons.PoisonIcon;
    case "psychic":
      return Icons.PsychicIcon;
    case "rock":
      return Icons.RockIcon;
    case "steel":
      return Icons.SteelIcon;
    case "water":
      return Icons.WaterIcon;
    default:
      return Icons.NormalIcon;
  }
}

export function range(from: number, to: number, step: number = 1) {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

export function getWeakness(...types: Array<Typing>): Record<Typing, number> {
  if (!types.length) return WEAKNESS.normal;

  const type1 = types[0];
  const type2 = types[1];
  const first = WEAKNESS[type1];

  if (type2) {
    const second = WEAKNESS[type2];

    const entries1 = Object.entries(first);
    const entries2 = Object.entries(second);

    const define = entries1.map(([name, value], index) => [name, value * entries2[index][1]]);
    return Object.fromEntries(define);
  }

  return first;
}

export function getBgClassName(type: Typing | string) {
  return classNames({
    "bg-bug-500": type === "bug",
    "bg-dark-500": type === "dark",
    "bg-dragon-500": type === "dragon",
    "bg-electric-500": type === "electric",
    "bg-fairy-500": type === "fairy",
    "bg-fighting-500": type === "fighting",
    "bg-fire-500": type === "fire",
    "bg-flying-500": type === "flying",
    "bg-ghost-500": type === "ghost",
    "bg-grass-500": type === "grass",
    "bg-ground-500": type === "ground",
    "bg-ice-500": type === "ice",
    "bg-normal-500": type === "normal",
    "bg-poison-500": type === "poison",
    "bg-psychic-500": type === "psychic",
    "bg-rock-500": type === "rock",
    "bg-steel-500": type === "steel",
    "bg-water-500": type === "water",
  });
}

export function getGradientClassName(pokemon: Pokemon, position: number) {
  return classNames({
    "to-secondary-500 from-bug-500": getType(pokemon, position) === "bug",
    "to-secondary-500 from-dark-500": getType(pokemon, position) === "dark",
    "to-secondary-500 from-dragon-500": getType(pokemon, position) === "dragon",
    "to-secondary-500 from-electric-500": getType(pokemon, position) === "electric",
    "to-secondary-500 from-fairy-500": getType(pokemon, position) === "fairy",
    "to-secondary-500 from-fighting-500": getType(pokemon, position) === "fighting",
    "to-secondary-500 from-fire-500": getType(pokemon, position) === "fire",
    "to-secondary-500 from-flying-500": getType(pokemon, position) === "flying",
    "to-secondary-500 from-ghost-500": getType(pokemon, position) === "ghost",
    "to-secondary-500 from-grass-500": getType(pokemon, position) === "grass",
    "to-secondary-500 from-ground-500": getType(pokemon, position) === "ground",
    "to-secondary-500 from-ice-500": getType(pokemon, position) === "ice",
    "to-secondary-500 from-normal-500": getType(pokemon, position) === "normal",
    "to-secondary-500 from-poison-500": getType(pokemon, position) === "poison",
    "to-secondary-500 from-psychic-500": getType(pokemon, position) === "psychic",
    "to-secondary-500 from-rock-500": getType(pokemon, position) === "rock",
    "to-secondary-500 from-steel-500": getType(pokemon, position) === "steel",
    "to-secondary-500 from-water-500": getType(pokemon, position) === "water",
  });
}

export function getTextClassName(type: Typing) {
  return classNames({
    "text-bug-500": type === "bug",
    "text-dark-500": type === "dark",
    "text-dragon-500": type === "dragon",
    "text-electric-500": type === "electric",
    "text-fairy-500": type === "fairy",
    "text-fighting-500": type === "fighting",
    "text-fire-500": type === "fire",
    "text-flying-500": type === "flying",
    "text-ghost-500": type === "ghost",
    "text-grass-500": type === "grass",
    "text-ground-500": type === "ground",
    "text-ice-500": type === "ice",
    "text-normal-500": type === "normal",
    "text-poison-500": type === "poison",
    "text-psychic-500": type === "psychic",
    "text-rock-500": type === "rock",
    "text-steel-500": type === "steel",
    "text-water-500": type === "water",
  });
}

export function getBorderClassName(type: Typing) {
  return classNames({
    "border-bug-500": type === "bug",
    "border-dark-500": type === "dark",
    "border-dragon-500": type === "dragon",
    "border-electric-500": type === "electric",
    "border-fairy-500": type === "fairy",
    "border-fighting-500": type === "fighting",
    "border-fire-500": type === "fire",
    "border-flying-500": type === "flying",
    "border-ghost-500": type === "ghost",
    "border-grass-500": type === "grass",
    "border-ground-500": type === "ground",
    "border-ice-500": type === "ice",
    "border-normal-500": type === "normal",
    "border-poison-500": type === "poison",
    "border-psychic-500": type === "psychic",
    "border-rock-500": type === "rock",
    "border-steel-500": type === "steel",
    "border-water-500": type === "water",
  });
}

export function getStrokeColorClassName(type: Typing) {
  return classNames({
    "stroke-bug-500": type === "bug",
    "stroke-dark-500": type === "dark",
    "stroke-dragon-500": type === "dragon",
    "stroke-electric-500": type === "electric",
    "stroke-fairy-500": type === "fairy",
    "stroke-fighting-500": type === "fighting",
    "stroke-fire-500": type === "fire",
    "stroke-flying-500": type === "flying",
    "stroke-ghost-500": type === "ghost",
    "stroke-grass-500": type === "grass",
    "stroke-ground-500": type === "ground",
    "stroke-ice-500": type === "ice",
    "stroke-normal-500": type === "normal",
    "stroke-poison-500": type === "poison",
    "stroke-psychic-500": type === "psychic",
    "stroke-rock-500": type === "rock",
    "stroke-steel-500": type === "steel",
    "stroke-water-500": type === "water",
  });
}

export function getFillColorClassName(type: Typing) {
  return classNames({
    "fill-bug-500": type === "bug",
    "fill-dark-500": type === "dark",
    "fill-dragon-500": type === "dragon",
    "fill-electric-500": type === "electric",
    "fill-fairy-500": type === "fairy",
    "fill-fighting-500": type === "fighting",
    "fill-fire-500": type === "fire",
    "fill-flying-500": type === "flying",
    "fill-ghost-500": type === "ghost",
    "fill-grass-500": type === "grass",
    "fill-ground-500": type === "ground",
    "fill-ice-500": type === "ice",
    "fill-normal-500": type === "normal",
    "fill-poison-500": type === "poison",
    "fill-psychic-500": type === "psychic",
    "fill-rock-500": type === "rock",
    "fill-steel-500": type === "steel",
    "fill-water-500": type === "water",
  });
}
