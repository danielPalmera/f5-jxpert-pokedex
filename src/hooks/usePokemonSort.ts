import { useEffect, useState } from "react";
import { SortFiltersOptions } from "../constants/Stats";

export function usePokemonSort(filtered: any[], sorting: string) {
  const [sorted, setSorted] = useState<any[]>([]);

  useEffect(() => {
    if (sorting === "default") {
      setSorted([...filtered].sort((a, b) => a.id - b.id));
      return;
    }
    const statKey = SortFiltersOptions[sorting]?.apiStatName;
    if (!statKey) return;
    setSorted(
      [...filtered].sort((a, b) => {
        const aStat = a.stats.find((s) => s.name === statKey);
        const bStat = b.stats.find((s) => s.name === statKey);
        return bStat.base - aStat.base;
      }),
    );
  }, [filtered[0]?.id, sorting]);

  return sorted;
}
