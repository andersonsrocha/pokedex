export type Typing =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export interface Pokemon {
  id: number;
  name: string;
  types: Array<Type>;
  weight: number;
  height: number;
  stats: Array<Stats>;
  sprites: Sprite;
}

export interface Type {
  type: Record<"name", Typing>;
}

export interface Stats {
  base_stat: number;
}

export interface Sprite {
  other: Record<"official-artwork", Record<"front_default", string>>;
}
