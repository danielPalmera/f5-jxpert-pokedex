import { useEffect, useState } from 'react';

import { getPokemons } from '../api/pokemonApi';

export function usePokemonData(region: string) {
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setError(err instanceof Error ? err.message : 'Error loading Pokémon');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [region]);

  return { result, loading, error };
}
