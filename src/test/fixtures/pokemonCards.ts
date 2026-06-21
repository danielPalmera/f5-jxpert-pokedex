import { PokemonCardData } from "../../types/PokemonCardData";

export const bulbasaur: PokemonCardData = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  sprites: {
    other: { "official-artwork": { front_default: "https://example.com/1.png" } },
  },
  stats: [
    { name: "hp", base: 45 },
    { name: "attack", base: 49 },
    { name: "defense", base: 49 },
    { name: "special-attack", base: 65 },
    { name: "special-defense", base: 65 },
    { name: "speed", base: 45 },
  ],
};

export const charmander: PokemonCardData = {
  id: 4,
  name: "charmander",
  height: 6,
  types: [{ type: { name: "fire" } }],
  sprites: {
    other: { "official-artwork": { front_default: "https://example.com/4.png" } },
  },
  stats: [
    { name: "hp", base: 39 },
    { name: "attack", base: 52 },
    { name: "defense", base: 43 },
    { name: "special-attack", base: 60 },
    { name: "special-defense", base: 50 },
    { name: "speed", base: 65 },
  ],
};

export const squirtle: PokemonCardData = {
  id: 7,
  name: "squirtle",
  height: 5,
  types: [{ type: { name: "water" } }],
  sprites: {
    other: { "official-artwork": { front_default: "https://example.com/7.png" } },
  },
  stats: [
    { name: "hp", base: 44 },
    { name: "attack", base: 48 },
    { name: "defense", base: 65 },
    { name: "special-attack", base: 50 },
    { name: "special-defense", base: 64 },
    { name: "speed", base: 43 },
  ],
};

export const mockCards = [bulbasaur, charmander, squirtle];
