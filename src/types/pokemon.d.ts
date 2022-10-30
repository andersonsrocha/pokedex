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
  abilities: Array<Record<"ability", Ability>>;
  base_experience: number;
  height: number;
  id: number;
  name: string;
  sprites: Sprite;
  stats: Array<Stats>;
  types: Array<Type>;
  weight: number;
}

export interface Specie {
  id: number;
  base_happiness: number;
  capture_rate: number;
  varieties: Array<Variety>;
  evolution_chain: Chain;
  flavor_text_entries: Array<Description>;
  forms_switchable: boolean;
  gender_rate: number;
  names: Array<Language>;
  genera: Array<Genera>;
  growth_rate: Record<"name" | "url", string>;
  has_gender_differences: boolean;
}

export interface Variety {
  is_default: boolean;
  pokemon: Record<"name" | "url", string>;
}

export interface Type {
  type: Record<"name", Typing>;
}

export interface Stats {
  base_stat: number;
}

export interface Sprite {
  other: Record<"official-artwork" | "home", Record<"front_default" | "front_female", string>>;
}

export interface Language {
  name: string;
  language: Record<"name" | "url", string>;
}

export interface Description {
  flavor_text: string;
  language: Record<"name" | "url", string>;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Genera {
  genus: string;
  language: Record<"name" | "url", string>;
}

export interface Chain {
  id: number;
  evolves_to: Array<Chain>;
  species: Record<"name" | "url", string>;
  url: string;
}
