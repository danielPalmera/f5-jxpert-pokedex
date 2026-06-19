import { Regions } from "../constants/Regions";
import type { PokemonCardData, PokemonStat } from "../types/PokemonCardData";
import type { ApiPokemonDetail, ApiPokemonListResponse } from "./types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

async function fetchList(
  offset: number,
  limit: number,
): Promise<PokemonCardData[]> {
  const { results }: ApiPokemonListResponse = await fetch(
    `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`,
  ).then((res) => res.json());

  return Promise.all(results.map(({ url }) => fetchDetail(url)));
}

async function fetchDetail(url: string): Promise<PokemonCardData> {
  const data: ApiPokemonDetail = await fetch(url).then((res) => res.json());

  return {
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: data.sprites,
    stats: data.stats.map(
      (s): PokemonStat => ({
        name: s.stat.name,
        base: Number(s.base_stat),
      }),
    ),
  };
}

export function getPokemons(region: string): Promise<PokemonCardData[]> {
  const { start, end } = Regions[region] ?? Regions.kanto;
  return fetchList(start, end);
}
