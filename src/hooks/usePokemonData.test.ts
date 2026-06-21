import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePokemonData } from "./usePokemonData";
import { mockCards } from "../test/fixtures/pokemonCards";

const mockGetPokemons = vi.fn();

vi.mock("../contexts/ApiContext", () => ({
  useApi: () => ({ getPokemons: mockGetPokemons }),
}));

describe("usePokemonData", () => {
  it("starts loading and then returns data", async () => {
    mockGetPokemons.mockResolvedValue(mockCards);
    const { result } = renderHook(() => usePokemonData("kanto"));

    expect(result.current.loading).toBe(true);
    expect(result.current.result).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.result).toHaveLength(3);
    expect(result.current.error).toBeNull();
  });

  it("sets error on failure", async () => {
    mockGetPokemons.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => usePokemonData("kanto"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.result).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("refetches when region changes", async () => {
    mockGetPokemons.mockResolvedValue(mockCards);
    const { result, rerender } = renderHook(({ region }) => usePokemonData(region), {
      initialProps: { region: "kanto" },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockGetPokemons).toHaveBeenCalledWith("kanto");

    mockGetPokemons.mockResolvedValue([mockCards[0]]);
    rerender({ region: "johto" });

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockGetPokemons).toHaveBeenCalledWith("johto");
  });

  it("cancels previous request on unmount", () => {
    mockGetPokemons.mockResolvedValue(mockCards);
    const { result, unmount } = renderHook(() => usePokemonData("kanto"));
    unmount();
    expect(result.current.loading).toBe(true);
  });
});
