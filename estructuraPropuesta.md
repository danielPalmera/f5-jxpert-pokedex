# Estructura actual del proyecto

```
f5-jxpert-pokedex/
├── .git/
├── .gitignore
├── eslint.config.js
├── index.html
├── node_modules/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
├── vite.config.ts
├── yarn.lock
├── estructura_actual.md
├── estructuraPropuesta.md
└── src/
    ├── App.tsx                     # Monolito original (todo inline)
    ├── App2.tsx                    # Página nueva (solo layout)
    ├── main.tsx                    # Entry point
    ├── Router.tsx                  # / → App, /app2 → App2
    ├── types.d.ts                  # Declaración SVG
    ├── assets/
    │   ├── styles/
    │   │   └── index.css
    │   └── images/
    │       ├── bug.svg … water.svg # 18 SVGs individuales (usa App.tsx)
    │       ├── pokeball.svg        # Logo (usa Header.tsx)
    │       └── pokemon-types.svg   # Sprite unificado (usa App2)
    ├── constants/
    │   ├── Regions.ts              # Offset de regiones
    │   └── Stats.ts                # Stats + SortFiltersOptions
    ├── types/
    │   ├── PokemonCardData.ts      # PokemonCardData, PokemonStat
    │   └── Stats.ts                # SortFilterOption, pokemonStat
    └── components/
        ├── atoms/
        │   ├── Header.tsx          # Header reutilizable
        │   ├── Footer.tsx          # Footer reutilizable
        │   ├── Loading.tsx         # Placeholder de carga
        │   ├── DropDownRegion.tsx   # Dropdown de regiones
        │   ├── OrderControls.tsx    # Menú de ordenación
        │   ├── CardTagType.tsx     # Icono de tipo (usa sprite)
        │   ├── CardTagNumber.tsx   # Nº de Pokémon
        │   └── CardProgressStat.tsx# Barra de estadística
        ├── molecules/
        │   ├── PokemonCard.tsx     # Molecule: Badge + TypeIcon + img + stats
        │   └── CardTagTypeList.tsx # Molecule: lista de CardTagType
        ├── organisms/
        │   └── SearchSection.tsx   # Organism: búsqueda + región + orden + grid
        └── layout/
            ├── FloatingTab.tsx     # VACÍO (0 líneas)
            └── MainLayout.tsx      # NO USADO (layout abandonado)
```

## Problemas detectados (SOLID + Atómico)

| Principio | Problema |
|-----------|----------|
| **SRP** | `SearchSection` hace fetch, filter, sort y render — demasiadas responsabilidades |
| **OCP** | `SearchSection.sort` cerrado a extensión (usa efecto con ifs, difícil de extender) |
| **ISP** | `DropDownRegion` recibe `showSort` sin usarlo; `OrderControls` recibe `showregs` sin usarlo |
| **DIP** | `SearchSection` depende directamente de `fetch`/PokeAPI — no hay capa de abstracción |
| **Atómico** | Faltan `templates/` y `pages/`; `layout/` mezcla conceptos; hay archivos muertos |

---

# Estructura propuesta con SOLID + Diseño Atómico

```
src/
├── api/                              # DIP: abstracción de datos
│   ├── pokemonApi.ts                 # Funciones fetch a PokeAPI
│   └── types.ts                      # Tipos de respuesta API
├── assets/
│   ├── images/
│   │   ├── pokemon-types.svg         # Sprite único
│   │   ├── pokeball.svg              # Logo
│   │   └── bug.svg … water.svg       # Conservados para App.tsx
│   └── styles/
│       └── index.css
├── components/
│   ├── atoms/                        # Componentes básicos e indivisibles
│   │   ├── Badge.tsx                 # Nº de Pokémon (#001)
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   ├── ProgressBar.tsx           # Barra de estadística genérica
│   │   ├── RegionItem.tsx            # Item de lista de regiones
│   │   ├── SearchInput.tsx           # Input de búsqueda
│   │   ├── SortPill.tsx              # Opción de orden (StatShortName)
│   │   └── TypeIcon.tsx              # Icono de tipo (usa sprite)
│   ├── molecules/                    # Combinación de átomos
│   │   ├── PokemonCard.tsx           # TypeIcon + Badge + img + ProgressBar[]
│   │   ├── RegionDropdown.tsx        # Button + RegionItem[]
│   │   └── SortMenu.tsx              # Button + SortPill[]
│   ├── organisms/                    # Combinación de moléculas/átomos
│   │   ├── PokemonGrid.tsx           # PokemonCard[] + Loading
│   │   └── SearchControls.tsx        # SearchInput + RegionDropdown + SortMenu
│   ├── templates/                    # Layouts sin lógica ni datos
│   │   ├── MainLayout.tsx            # Header + contenido + Footer
│   │   └── AltLayout.tsx             # Variante (opcional)
│   └── pages/                        # Páginas con lógica y estado
│       ├── HomePage.tsx              # Reemplaza App.tsx (monolito)
│       └── AltPage.tsx               # Reemplaza App2.tsx (nueva)
├── constants/                        # SRP: datos separados de lógica
│   ├── Regions.ts
│   └── Stats.ts
├── hooks/                            # SRP: lógica extraída de componentes
│   ├── usePokemonData.ts             # Fetch + estados (loading, error)
│   ├── usePokemonFilter.ts           # Filtrado por nombre/tipo
│   └── usePokemonSort.ts             # Ordenamiento por stats
├── types/                            # ISP: interfaces segregadas
│   ├── pokemon.ts                    # PokemonCardData, PokemonStat
│   └── stat.ts                       # SortFilterOption, pokemonStat
├── App.tsx
├── Router.tsx
├── main.tsx
└── types.d.ts
```

## Criterio atómico aplicado

| Nivel | Descripción | Ejemplo |
|-------|-------------|---------|
| **Atom** | No contiene otros componentes | `TypeIcon`, `ProgressBar`, `RegionItem` |
| **Molecule** | Combina átomos con funcionalidad específica | `PokemonCard` usa `TypeIcon` + `Badge` + `ProgressBar` |
| **Organism** | Sección autónoma que combina moléculas | `SearchControls` usa `SearchInput` + `RegionDropdown` + `SortMenu` |
| **Template** | Layout posicional sin datos | `MainLayout` define header, main, footer |
| **Page** | Template + organismos + hooks/datos | `AltPage` usa `MainLayout` + `SearchControls` + `PokemonGrid` |

## Mapeo SOLID

| Principio | Cómo se cumple |
|-----------|----------------|
| **SRP** | Cada archivo tiene una responsabilidad: `usePokemonData.ts` solo fetch, `usePokemonFilter.ts` solo filtrar, `SearchControls.tsx` solo UI |
| **OCP** | Abierto a extensión: nuevos tipos de orden solo requieren agregar entrada en `SortFiltersOptions` |
| **LSP** | Componentes tipados con interfaces estrictas; props que no se usan no se declaran |
| **ISP** | `RegionDropdown` solo recibe `{ regions, selected, onSelect }` — sin props sobrantes |
| **DIP** | `api/pokemonApi.ts` abstrae el fetch; los hooks dependen de la abstracción, no de `fetch` directamente |

## Archivos a eliminar o reemplazar

| Archivo | Motivo |
|---------|--------|
| `components/layout/FloatingTab.tsx` | Vacío |
| `components/layout/MainLayout.tsx` | No usado, reemplazar por `templates/MainLayout.tsx` |
| `App.tsx` | Reemplazar por `pages/HomePage.tsx` |
| `App2.tsx` | Reemplazar por `pages/AltPage.tsx` |
| `components/atoms/DropDownRegion.tsx` | Reemplazar por `molecules/RegionDropdown.tsx` (es una molécula, no átomo) |
| `components/atoms/OrderControls.tsx` | Reemplazar por `molecules/SortMenu.tsx` (es una molécula, no átomo) |
| `components/atoms/CardTagType.tsx` | Reemplazar por `atoms/TypeIcon.tsx` (nombre más semántico) |
| `components/atoms/CardTagNumber.tsx` | Reemplazar por `atoms/Badge.tsx` (nombre más semántico) |
| `components/atoms/CardProgressStat.tsx` | Reemplazar por `atoms/ProgressBar.tsx` (nombre más semántico) |
| `components/molecules/CardTagTypeList.tsx` | Fusionar en `molecules/PokemonCard.tsx` (solo mapea tipos) |
| `components/organisms/SearchSection.tsx` | Dividir en `SearchControls.tsx` + `PokemonGrid.tsx` + hooks |
| `types/PokemonCardData.ts` | Renombrar a `types/pokemon.ts` (convención kebab) |
