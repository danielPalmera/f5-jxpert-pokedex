import { useMemo } from "react";
import { SortFiltersOptions } from "../constants/Stats";
import { PokemonCardData } from "../types/PokemonCardData";

export function usePokemonSort(filtered: PokemonCardData[], sorting: string): PokemonCardData[] {
  return useMemo(() => {
    if (sorting === "default") {
      return [...filtered].sort((a, b) => a.id - b.id);
    }
    const statKey = SortFiltersOptions[sorting]?.apiStatName;
    if (!statKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aStat = a.stats.find((s) => s.name === statKey);
      const bStat = b.stats.find((s) => s.name === statKey);
      return (bStat?.base ?? 0) - (aStat?.base ?? 0);
    });
  }, [filtered, sorting]);
}
