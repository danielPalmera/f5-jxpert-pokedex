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
    ├── App.tsx
    ├── App2.tsx
    ├── index.css
    ├── main.tsx
    ├── Router.tsx
    ├── sss.json
    ├── types.d.ts
    ├── assets/
    │   ├── bug.svg
    │   ├── dark.svg
    │   ├── dragon.svg
    │   ├── electric.svg
    │   ├── fairy.svg
    │   ├── fighting.svg
    │   ├── fire.svg
    │   ├── flying.svg
    │   ├── ghost.svg
    │   ├── grass.svg
    │   ├── ground.svg
    │   ├── ice.svg
    │   ├── normal.svg
    │   ├── poison.svg
    │   ├── pokeball.svg
    │   ├── psychic.svg
    │   ├── rock.svg
    │   ├── steel.svg
    │   └── water.svg
    └── components/
        ├── atoms/
        │   ├── Footer.tsx
        │   └── Header.tsx
        ├── layout/
        │   └── FloatingTab.tsx
        ├── molecules/    (vacío)
        ├── organisms/    (vacío)
        ├── pokemon/      (vacío)
        └── shared/       (vacío)
```

---

# Estructura propuesta con Diseño Atómico

```
src/
├── components/
│   ├── atoms/               # Componentes básicos e indivisibles
│   │   ├── SearchIcon.tsx   # SVG lupa
│   │   ├── ChevronIcon.tsx  # SVG flechas arriba/abajo
│   │   ├── SortIcon.tsx     # SVG de ordenamiento
│   │   ├── SearchInput.tsx  # Input de búsqueda
│   │   ├── RegionItem.tsx   # Item del listado de regiones
│   │   ├── SortPill.tsx     # Opción de orden
│   │   ├── TypeIcon.tsx     # Icono de tipo Pokémon
│   │   ├── ProgressBar.tsx  # Barra de estadística
│   │   ├── Badge.tsx        # Etiqueta (ej: nº de Pokémon)
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── molecules/           # Combinación de átomos
│   │   ├── SearchBar.tsx    # SearchIcon + SearchInput
│   │   ├── RegionDropdown.tsx # DropdownButton + ChevronIcon + RegionItem[]
│   │   ├── SortMenu.tsx     # SortButton + SortIcon + SortPill[]
│   │   └── PokemonCard.tsx  # Badge + TypeIcon + img + ProgressBar[]
│   ├── organisms/           # Combinación de moléculas/átomos
│   │   ├── SearchSection.tsx # SearchBar + RegionDropdown + SortMenu
│   │   ├── PokemonGrid.tsx  # PokemonCard[] + PlaceholderCards
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingTab.tsx
│   └── templates/           # Layouts con posición, sin datos
│       ├── MainLayout.tsx
│       └── AltLayout.tsx
├── pages/                   # Instancias de templates con datos y lógica
│   ├── HomePage.tsx
│   └── AltPage.tsx
├── assets/
├── App.tsx
├── Router.tsx
└── main.tsx
```

## Criterio atómico

| Nivel        | Descripción                   | Ejemplo                                                         |
| ------------ | ----------------------------- | --------------------------------------------------------------- |
| **Atom**     | No contiene otros componentes | `TypeIcon`, `ProgressBar`                                       |
| **Molecule** | Combina átomos                | `PokemonCard` usa `TypeIcon` + `ProgressBar` + `Badge`          |
| **Organism** | Combina moléculas/átomos      | `SearchSection` usa `SearchBar` + `RegionDropdown` + `SortMenu` |
| **Template** | Define layout sin datos       | `MainLayout` con header, main, footer                           |
| **Page**     | Template + datos y lógica     | `HomePage` usa `MainLayout` + `SearchSection` + `PokemonGrid`   |

## Sugerencias de implementación

- `SearchSection` (organismo) contiene `SearchBar` + `RegionDropdown` + `SortMenu`
- Cada molécula recibe props para sus eventos (onChange, onSelect, etc.)
- Las páginas orquestan hooks y se los pasan a los organismos vía props
