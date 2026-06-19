import { useEffect, useState } from 'react';

export function usePokemonFilter(result: any[], busqueda: string) {
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    setFiltered(
      result.filter(
        (res) =>
          res.name.includes(busqueda.toLowerCase()) ||
          !!res.types.find((type) => type.type.name.startsWith(busqueda.toLowerCase()))
      )
    );
  }, [result[0]?.id, busqueda]);

  return filtered;
}
