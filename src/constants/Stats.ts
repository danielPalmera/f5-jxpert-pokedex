import { SortFilterOption } from '../types/Stats';

export const Stats: Record<string, SortFilterOption> = {
  hp: { label: 'Health points', StatShortName: 'Hp', apiStatName: 'hp' },
  attack: { label: 'Attack', StatShortName: 'At', apiStatName: 'attack' },
  defense: { label: 'Defense', StatShortName: 'Df', apiStatName: 'defense' },
  specialAttack: { label: 'Special attack', StatShortName: 'SpA', apiStatName: 'special-attack' },
  specialDefense: {
    label: 'Special defense',
    StatShortName: 'SpD',
    apiStatName: 'special-defense',
  },
  speed: { label: 'Speed', StatShortName: 'Spd', apiStatName: 'speed' },
};

export const SortFiltersOptions: Record<string, SortFilterOption> = {
  default: { label: '', StatShortName: 'Default' },
  ...Stats,
};
