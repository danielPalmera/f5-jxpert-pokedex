import { TypesPokemon } from "../../types/Pokemons";
import { CardTagNumber } from "../atoms/CardTagNumber";
import { CardTagType } from "../atoms/CardTagType";
import { CardTagTypeList } from "./CardTagTypeList";
import { CardProgressStat } from "../atoms/CardProgressStat";
export const PokemonCard = ({
  res,
  customStyles,
}: {
  res: any;
  customStyles: any;
}) => {
  return (
    <li key={`pokemon-card-${res.id}`}>
      <article className="card" style={customStyles}>
        <header className="card__head">
          <CardTagNumber id={res.id} />
          <CardTagTypeList res={res} />
        </header>
        <img
          className="card__avatar"
          src={res.sprites.other["official-artwork"].front_default}
          loading="lazy"
          alt={`${res.name} artwork`}
        />
        <section className="card__content">
          <h3 className="card__title">{res.name}</h3>
          <ul aria-description="Stats resume">
            {res.stats.map((stat: any, index: number) => (
              <CardProgressStat
                key={`pokemon-card-${res.id}-stat-${index}`}
                stat={stat}
              />
            ))}
          </ul>
        </section>
      </article>
    </li>
  );
};
