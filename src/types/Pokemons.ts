import bug from "../assets/bug.svg";
import dark from "../assets/dark.svg";
import dragon from "../assets/dragon.svg";
import electric from "../assets/electric.svg";
import fairy from "../assets/fairy.svg";
import fighting from "../assets/fighting.svg";
import fire from "../assets/fire.svg";
import flying from "../assets/flying.svg";
import ghost from "../assets/ghost.svg";
import grass from "../assets/grass.svg";
import ground from "../assets/ground.svg";
import ice from "../assets/ice.svg";
import normal from "../assets/normal.svg";
import poison from "../assets/poison.svg";
import psychic from "../assets/psychic.svg";
import rock from "../assets/rock.svg";
import steel from "../assets/steel.svg";
import water from "../assets/water.svg";

export interface PokemonType {
  name: string;
  iconImg: string;
}

export type PokemonTypes = PokemonType[];

//sacar de aqui
export const TypesPokemon: PokemonTypes = [
  { name: "bug", iconImg: bug },
  { name: "dark", iconImg: dark },
  { name: "dragon", iconImg: dragon },
  { name: "electric", iconImg: electric },
  { name: "fairy", iconImg: fairy },
  { name: "fighting", iconImg: fighting },
  { name: "fire", iconImg: fire },
  { name: "flying", iconImg: flying },
  { name: "ghost", iconImg: ghost },
  { name: "grass", iconImg: grass },
  { name: "ground", iconImg: ground },
  { name: "ice", iconImg: ice },
  { name: "normal", iconImg: normal },
  { name: "poison", iconImg: poison },
  { name: "psychic", iconImg: psychic },
  { name: "rock", iconImg: rock },
  { name: "steel", iconImg: steel },
  { name: "water", iconImg: water },
];
