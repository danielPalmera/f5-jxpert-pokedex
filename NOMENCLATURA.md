# Nomenclaturas del Proyecto

## 1. Archivos

| Tipo | Convención | Ejemplos |
|---|---|---|
| Componentes React | `PascalCase.tsx` | `Header.tsx`, `PokemonCard.tsx`, `SearchSection.tsx` |
| Hooks | `camelCase` con prefijo `use` | `usePokemonData.ts`, `usePokemonFilter.ts` |
| Types / Interfaces | `PascalCase.ts` | `PokemonCardData.ts`, `Stats.ts` |
| Constantes | `PascalCase.ts` | `Regions.ts`, `Stats.ts` |
| API | `camelCase.ts` | `pokemonApi.ts`, `types.ts` |
| App raíz | `PascalCase.tsx` | `App.tsx`, `App2.tsx`, `Router.tsx` |
| Entry point | `camelCase.tsx` | `main.tsx` |
| CSS | `kebab-case.css` | `index.css` |
| SVG / imágenes | `kebab-case` | `pokeball.svg`, `fire.svg`, `pokemon-types.svg` |

## 2. Directorios (Atomic Design)

```
src/
  api/          — Llamadas y tipos de API
  assets/
    images/     — SVG (kebab-case)
    styles/     — CSS (kebab-case)
  components/
    atoms/      — Bloques atómicos (una responsabilidad)
    molecules/  — Composición de átomos
    organisms/  — Secciones complejas que combinan moléculas
  constants/    — Objetos de configuración (PascalCase)
  hooks/        — Custom hooks (camelCase, prefijo `use`)
  types/        — Interfaces compartidas (PascalCase)
```

## 3. Componentes React

- **Export nombrado** siempre: `export const Componente = () => { ... }`
- **Sin default exports**
- **PascalCase**, nombre = nombre del archivo
- **Props** tipadas inline o con interface local `Props`
- **Arrow functions** para componentes

## 4. Hooks

- Prefijo `use` + dominio en PascalCase → `usePokemonData`, `usePokemonFilter`
- **Function declarations** (`export function useX()`) — no arrow functions
- Retornan objetos planos o valores primitivos

## 5. Types / Interfaces

- **PascalCase** para todas las interfaces
- **Tipos de API** con prefijo `Api` → `ApiPokemonDetail`
- **Tipos internos** (no exportados) también PascalCase
- **Importación** con `import type { ... }`

## 6. Variables y funciones

- **camelCase** para variables de estado, locales y parámetros
- **camelCase** para funciones y métodos
- **camelCase** para setters: `setRegion`, `setShowSort`
- **UPPER_SNAKE_CASE** solo para constantes de URL/base: `POKEAPI_BASE`

## 7. CSS — BEM (Block Element Modifier)

- **Bloque:** `.header`, `.card`, `.search`, `.dropdown`
- **Elemento:** `.card__head`, `.card__avatar`, `.search__icon`
- **Modificador:** `.card__avatar--placeholder`, `.card--fire`
- **Clases de tipo Pokémon:** kebab-case → `.fire`, `.water`, `.grass`
- **Custom properties:** kebab-case con prefijo semántico → `--color-fire`, `--spacing-xs`, `--radius-m`

## 8. Constantes

- Objetos de configuración: **PascalCase** (`Regions`, `Stats`, `SortFiltersOptions`)
- Propiedades internas: **camelCase** (`kanto`, `specialAttack`, `apiStatName`)
- URL base: **UPPER_SNAKE_CASE** (`POKEAPI_BASE`)

## 9. Imports

1. Paquetes externos (React, React Router)
2. Módulos internos (componentes, hooks, types, constants, api)
3. Sin extensión de archivo explícita
4. Sin barrel patterns — imports directos a cada archivo

## Inconsistencias detectadas (por resolver)

| Área | Problema |
|---|---|
| `pokemonStat` (minúscula) en `types/Stats.ts` vs `PokemonStat` (PascalCase) en `types/PokemonCardData.ts` | Mismo concepto, casing distinto |
| `StatShortName` (PascalCase) vs `apiStatName` / `label` (camelCase) en `SortFilterOption` | Mezcla de casing en propiedades |
| `showregs` (todo minúscula) vs `showSort` (camelCase) en el mismo componente | Inconsistencia en estado |
| `setreg` en `App.tsx` vs `setRegion` en `App2.tsx` | Setter sin PascalCase |
| `busqueda` (español) mezclado con inglés | Idioma inconsistente |
| `App.tsx` usa `any` extensivamente; `App2.tsx` y refactorizados tipan correctamente | Legacy vs moderno |
