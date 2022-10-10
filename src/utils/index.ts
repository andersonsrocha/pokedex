import { Pokemon, Typing } from "@types";
import * as Icons from "@icons";

export function getType(pokemon: Pokemon, pos = 0) {
  const { types } = pokemon;
  return types[pos].type.name;
}

export function getTypeIcon(type: Typing) {
  switch (type) {
    case "bug":
      return Icons.BugOutline;
    case "dark":
      return Icons.DarkOutline;
    case "dragon":
      return Icons.DragonOutline;
    case "electric":
      return Icons.ElectricOutline;
    case "fairy":
      return Icons.FairyOutline;
    case "fighting":
      return Icons.FightingOutline;
    case "fire":
      return Icons.FireOutline;
    case "flying":
      return Icons.FlyingOutline;
    case "ghost":
      return Icons.GhostOutline;
    case "grass":
      return Icons.GrassOutline;
    case "ground":
      return Icons.GroundOutline;
    case "ice":
      return Icons.IceOutline;
    case "normal":
      return Icons.NormalOutline;
    case "poison":
      return Icons.PoisonOutline;
    case "psychic":
      return Icons.PsychicOutline;
    case "rock":
      return Icons.RockOutline;
    case "steel":
      return Icons.SteelOutline;
    case "water":
      return Icons.WaterOutline;
    default:
      return Icons.NormalOutline;
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
