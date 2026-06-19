import { PokemonCardData } from "../types/PokemonCardData";

export type GetPokemonsFn = (region: string) => Promise<PokemonCardData[]>;
