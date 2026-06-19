import { useEffect, useState } from "react";
import { useApi } from "../api/ApiContext";
import { PokemonCardData } from "../types/PokemonCardData";

export function usePokemonData(region: string) {
  const [result, setResult] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getPokemons } = useApi();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPokemons(region)
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error loading Pokémon");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [region, getPokemons]);

  return { result, loading, error };
}
