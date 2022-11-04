import { Pokemon, Typing } from "@types";
import * as Icons from "@icons";

export * from "./modifiers";

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
