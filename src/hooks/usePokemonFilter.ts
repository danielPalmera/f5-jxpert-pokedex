import { useMemo } from "react";
import { PokemonCardData } from "../types/PokemonCardData";

export function usePokemonFilter(result: PokemonCardData[], busqueda: string): PokemonCardData[] {
  return useMemo(
    () =>
      result.filter(
        (res) =>
          res.name.includes(busqueda.toLowerCase()) ||
          !!res.types.find((type) =>
            type.type.name.startsWith(busqueda.toLowerCase()),
          ),
      ),
    [result, busqueda],
  );
}
