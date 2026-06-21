import { describe, expect, it, vi, beforeEach } from "vitest";
import { getPokemons } from "./pokemonApi";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

const mockBulbasaurDetail = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  sprites: { other: { "official-artwork": { front_default: "https://example.com/1.png" } } },
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
  ],
};

const mockListResponse = {
  results: [
    { url: "https://pokeapi.co/api/v2/pokemon/1/" },
  ],
};

describe("getPokemons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches list then detail for each pokemon", async () => {
    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockListResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockBulbasaurDetail) });

    const result = await getPokemons("kanto");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe("bulbasaur");
  });

  it("maps stats correctly", async () => {
    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockListResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockBulbasaurDetail) });

    const result = await getPokemons("kanto");
    expect(result[0].stats).toEqual([
      { name: "hp", base: 45 },
      { name: "attack", base: 49 },
    ]);
  });

  it("falls back to kanto for unknown region", async () => {
    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockListResponse) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockBulbasaurDetail) });

    await getPokemons("unknown");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
    );
  });

  it("throws on network error", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    await expect(getPokemons("kanto")).rejects.toThrow("Network error");
  });
});
