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
└── src/
    ├── App.tsx
        Cargar Pokémon desde la PokeAPI (https://pokeapi.co/api/v2/pokemon) por regiones (Kanto, Johto, etc.)
        Filtrar por nombre o tipo mediante el campo de búsqueda
        Ordenar por estadísticas (HP, At, Df, SpA, SpD, Spd)
        Renderizar una cuadrícula de tarjetas con la imagen oficial, tipos (con iconos SVG), número y barras de estadísticas de cada Pokémon
    ├── index.css
    ├── main.tsx
    ├── Router.tsx
    ├── types.d.ts
    └── assets/
        ├── bug.svg
        ├── dark.svg
        ├── dragon.svg
        ├── electric.svg
        ├── fairy.svg
        ├── fighting.svg
        ├── fire.svg
        ├── flying.svg
        ├── ghost.svg
        ├── grass.svg
        ├── ground.svg
        ├── ice.svg
        ├── normal.svg
        ├── poison.svg
        ├── pokeball.svg
        ├── psychic.svg
        ├── rock.svg
        ├── steel.svg
        └── water.svg
```
