export interface ApiPokemonListItem {
  name: string;
  url: string;
}

export interface ApiPokemonListResponse {
  count: number;
  results: ApiPokemonListItem[];
}

export interface ApiPokemonDetail {
  id: number;
  name: string;
  stats: ApiStat[];
  types: ApiType[];
  sprites: ApiSprite;
}

interface ApiStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface ApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface ApiSprite {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}
