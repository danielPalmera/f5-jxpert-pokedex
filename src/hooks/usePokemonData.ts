import { useEffect, useState } from "react";
import { getPokemons } from "../api/pokemonApi";

export function usePokemonData(region: string) {
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPokemons(region).then((data) => {
      if (!cancelled) {
        setResult(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [region]);

  return { result, loading };
}
