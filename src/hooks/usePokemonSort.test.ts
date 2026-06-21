import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePokemonSort } from "./usePokemonSort";
import { mockCards } from "../test/fixtures/pokemonCards";

describe("usePokemonSort", () => {
  it("sorts by id ascending when sorting is default", () => {
    const shuffled = [mockCards[1], mockCards[2], mockCards[0]];
    const { result } = renderHook(() => usePokemonSort(shuffled, "default"));
    expect(result.current[0].id).toBe(1);
    expect(result.current[1].id).toBe(4);
    expect(result.current[2].id).toBe(7);
  });

  it("sorts by speed descending", () => {
    const { result } = renderHook(() => usePokemonSort(mockCards, "speed"));
    expect(result.current[0].name).toBe("charmander");
    expect(result.current[result.current.length - 1].name).toBe("squirtle");
  });

  it("sorts by attack descending", () => {
    const { result } = renderHook(() => usePokemonSort(mockCards, "attack"));
    expect(result.current[0].name).toBe("charmander");
  });

  it("sorts by defense descending", () => {
    const { result } = renderHook(() => usePokemonSort(mockCards, "defense"));
    expect(result.current[0].name).toBe("squirtle");
  });

  it("returns original array for unknown sort key", () => {
    const { result } = renderHook(() => usePokemonSort(mockCards, "unknownKey"));
    expect(result.current).toHaveLength(3);
  });

  it("handles empty array", () => {
    const { result } = renderHook(() => usePokemonSort([], "default"));
    expect(result.current).toEqual([]);
  });
});
