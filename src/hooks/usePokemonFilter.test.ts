import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePokemonFilter } from "./usePokemonFilter";
import { mockCards } from "../test/fixtures/pokemonCards";

describe("usePokemonFilter", () => {
  it("returns all when busqueda is empty", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, ""));
    expect(result.current).toHaveLength(3);
  });

  it("filters by name case-insensitively", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, "Char"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("charmander");
  });

  it("filters by type prefix", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, "fire"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("charmander");
  });

  it("returns empty array when no match", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, "zzzzz"));
    expect(result.current).toEqual([]);
  });

  it("filters by partial name", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, "saur"));
    expect(result.current).toHaveLength(1);
  });

  it("is case-insensitive for type filter", () => {
    const { result } = renderHook(() => usePokemonFilter(mockCards, "WATER"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("squirtle");
  });
});
