import { NamedUrl } from "./common";

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
  abilities: Array<Ability>;
  base_experience: number;
  height: number;
  id: number;
  is_default: number;
  name: string;
  species: NamedUrl;
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
  growth_rate: NamedUrl;
  has_gender_differences: boolean;
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedUrl;
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
  language: NamedUrl;
}

export interface Description {
  flavor_text: string;
  language: NamedUrl;
}

export interface Ability {
  ability: NamedUrl;
  is_hidden: boolean;
}

export interface Genera {
  genus: string;
  language: NamedUrl;
}

export interface Chain {
  id: number;
  evolution_details: Array<ChainDetails>;
  evolves_to: Array<Chain>;
  species: NamedUrl;
  url: string;
}

export interface ChainDetails {
  known_move?: NamedUrl;
  min_happiness?: number;
  min_level?: number;
  trigger: NamedUrl;
}

export type Weakness = Record<Typing, Record<Typing, number>>;
