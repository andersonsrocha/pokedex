export type Typing =
  | "bug"
  | "electric"
  | "fire"
  | "flying"
  | "grass"
  | "ground"
  | "normal"
  | "poison"
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
