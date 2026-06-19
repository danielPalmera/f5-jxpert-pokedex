export interface PokemonStat {
  name: string;
  base: number;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonSprite {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonCardData {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprite;
  stats: PokemonStat[];
}
