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
    case "electric":
      return Icons.ElectricOutline;
    case "fire":
      return Icons.FireOutline;
    case "flying":
      return Icons.FlyingOutline;
    case "grass":
      return Icons.GrassOutline;
    case "ground":
      return Icons.GroundOutline;
    case "normal":
      return Icons.NormalOutline;
    case "poison":
      return Icons.PoisonOutline;
    case "water":
      return Icons.WaterOutline;
    default:
      return Icons.NormalOutline;
  }
}
