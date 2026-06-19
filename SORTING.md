# Ordenado de Pokémon por Stats

## Flujo General

```
SearchSection (organism)
  ↓ selecciona stat (ej: "specialAttack")
  ↓
usePokemonSort (hook)
  ↓ lookup en SortFiltersOptions
  ↓ ordena array por stat.base descendente
  ↓
PokemonCard (molecule) ← recibe array ya ordenado
```

## Archivos involucrados

| Archivo | Rol |
|---|---|
| `src/constants/Stats.ts` | Mapa de configuración: label, StatShortName, apiStatName |
| `src/types/Stats.ts` | Interfaz `SortFilterOption` |
| `src/hooks/usePokemonSort.ts` | Hook que ejecuta el ordenamiento |
| `src/components/organisms/SearchSection.tsx` | Orquestador que conecta sort UI con hook |
| `src/components/atoms/OrderControls.tsx` | UI del selector de ordenamiento |

## Mecanismo

### 1. Configuración (`constants/Stats.ts`)

```ts
export const SortFiltersOptions: Record<string, SortFilterOption> = {
  default: { label: "", StatShortName: "Default" },  // sin apiStatName → orden por ID
  hp:      { label: "Health points",  StatShortName: "Hp",  apiStatName: "hp" },
  attack:  { label: "Attack",         StatShortName: "At",  apiStatName: "attack" },
  defense: { label: "Defense",        StatShortName: "Df",  apiStatName: "defense" },
  specialAttack:  { label: "Special attack",  StatShortName: "SpA", apiStatName: "special-attack" },
  specialDefense: { label: "Special defense", StatShortName: "SpD", apiStatName: "special-defense" },
  speed:   { label: "Speed",          StatShortName: "Spd", apiStatName: "speed" },
};
```

Cada clave (`hp`, `attack`, `specialAttack`, etc.) tiene:

- **`label`**: texto legible para mostrar en la UI
- **`StatShortName`**: abreviatura corta (Hp, At, SpA, etc.)
- **`apiStatName`**: nombre del stat tal como lo devuelve la PokeAPI (`"special-attack"`)

### 2. Hook `usePokemonSort`

```ts
const statKey = SortFiltersOptions[sorting]?.apiStatName;
```

- Si `sorting === "default"`, ordena por `id` ascendente (orden original por región)
- Si no, busca `apiStatName` en `SortFiltersOptions` y ordena descendente por `stat.base`

**Compare function:**

```ts
.filtered.sort((a, b) => {
  const aStat = a.stats.find((s) => s.name === statKey);
  const bStat = b.stats.find((s) => s.name === statKey);
  return (bStat?.base ?? 0) - (aStat?.base ?? 0);
});
```

- Busca dentro del array `stats` de cada Pokémon el objeto cuyo `name` coincida con `statKey`
- Compara el valor `base` de ambos Pokémon
- **Orden descendente** (mayor valor primero)

### 3. Mapeo de nombres de stats

| Clave en SortFiltersOptions | apiStatName (PokeAPI) |
|---|---|
| `hp` | `"hp"` |
| `attack` | `"attack"` |
| `defense` | `"defense"` |
| `specialAttack` | `"special-attack"` |
| `specialDefense` | `"special-defense"` |
| `speed` | `"speed"` |

### 4. Pipeline de datos

```
PokeAPI → ApiPokemonDetail.stats[].base_stat
  ↓ transform en api/pokemonApi.ts
PokemonStat[]  { name: "special-attack", base: 95 }
  ↓
usePokemonSort busca por name === statKey
  ↓ ordena por base descendente
```

## Notas

- El orden es siempre descendente: el Pokémon con el stat más alto aparece primero
- Si el stat no existe en un Pokémon (no debería ocurrir en PokeAPI), se usa `?? 0` como fallback
- El hook depende de `sorting` y de `filtered[0]?.id` para disparar el reordenamiento
