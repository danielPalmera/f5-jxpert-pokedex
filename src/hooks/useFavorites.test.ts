import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useFavorites } from "./useFavorites";

const STORAGE_KEY = "favorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty favorites", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a favorite", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual({ id: 1, name: "bulbasaur", height: 7 });
  });

  it("does not add duplicate", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    expect(result.current.favorites).toHaveLength(1);
  });

  it("removes a favorite", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    act(() => result.current.removeFavorite(1));
    expect(result.current.favorites).toEqual([]);
  });

  it("limits to 6 favorites (FIFO eviction)", () => {
    const { result } = renderHook(() => useFavorites());
    for (let i = 1; i <= 7; i++) {
      act(() => result.current.addFavorite(i, `pokemon-${i}`, i));
    }
    expect(result.current.favorites).toHaveLength(6);
    expect(result.current.favorites[0].id).toBe(2);
    expect(result.current.favorites[5].id).toBe(7);
  });

  it("isFavorite returns true for added pokemon", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(false);
  });

  it("toggleFavorite adds if not present", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite(1, "bulbasaur", 7));
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it("toggleFavorite removes if present", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    act(() => result.current.toggleFavorite(1, "bulbasaur", 7));
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.addFavorite(1, "bulbasaur", 7));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored).toEqual([{ id: 1, name: "bulbasaur", height: 7 }]);
  });

  it("loads from localStorage on mount", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: 1, name: "bulbasaur", height: 7 }]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toHaveLength(1);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });
});
