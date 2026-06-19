import { createContext, useContext } from "react";
import { GetPokemonsFn } from "../ports/PokemonApi";
import { getPokemons } from "../api/pokemonApi";

interface ApiContextValue {
  getPokemons: GetPokemonsFn;
}

const ApiContext = createContext<ApiContextValue>({ getPokemons });

export const ApiProvider = ApiContext.Provider;

export function useApi(): ApiContextValue {
  return useContext(ApiContext);
}
