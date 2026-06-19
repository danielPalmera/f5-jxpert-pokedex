import { useCallback, useEffect, useState } from "react";

const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export function getSpriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`;
}

interface FavoriteItem {
  id: number;
  name: string;
  height: number;
}

const STORAGE_KEY = "favorites";
const MAX_FAVORITES = 6;

function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((id: number, name: string, height: number) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === id)) return prev;
      const next = [...prev, { id, name, height }];
      return next.length > MAX_FAVORITES ? next.slice(1) : next;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (id: number, name: string, height: number) => {
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id, name, height);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
