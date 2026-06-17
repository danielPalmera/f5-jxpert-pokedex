export const Stats = {
  hp: { label: "Health points", StatShortName: "Hp" },
  attack: { label: "Attack", StatShortName: "At" },
  defense: { label: "Defense", StatShortName: "Df" },
  "special-attack": { label: "Special attack", StatShortName: "SpA" },
  "special-defense": { label: "Special defense", StatShortName: "SpD" },
  speed: { label: "Speed", StatShortName: "Spd" },
};

export const SortFiltersOptions: Record<string, SortFilterOption> = {
  default: { label: "", StatShortName: "" },
  hp: { label: "Health points", StatShortName: "Hp" },
  attack: { label: "Attack", StatShortName: "At" },
  defense: { label: "Defense", StatShortName: "Df" },
  specialAttack: { label: "Special attack", StatShortName: "SpA" },
  specialDefense: { label: "Special defense", StatShortName: "SpD" },
  speed: { label: "Speed", StatShortName: "Spd" },
};

export interface SortFilterOption {
  label: string;
  StatShortName: string;
}

export interface pokemonStat {
  name: string;
  base: number;
}
