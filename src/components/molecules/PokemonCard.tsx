import { TypesPokemon } from "../../types/Pokemons";
import { CardTagNumber } from "../atoms/CardTagNumber";
import { CardTagType } from "../atoms/CardTagType";
import { CardTagTypeList } from "./CardTagTypeList";
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
            <li className="card__stat" aria-label="Health points">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  Hp
                </p>
                <p>{res.stats[0].base_stat}</p>
              </div>
              <progress value={res.stats[0].base_stat} max="255"></progress>
            </li>
            <li className="card__stat" aria-label="Attack">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  At
                </p>
                <p>{res.stats[1].base_stat}</p>
              </div>
              <progress value={res.stats[1].base_stat} max="255"></progress>
            </li>
            <li className="card__stat" aria-label="Defense">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  Df
                </p>
                <p>{res.stats[2].base_stat}</p>
              </div>
              <progress value={res.stats[2].base_stat} max="255"></progress>
            </li>
            <li className="card__stat" aria-label="Special attack">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  SpA
                </p>
                <p>{res.stats[3].base_stat}</p>
              </div>
              <progress value={res.stats[3].base_stat} max="255"></progress>
            </li>
            <li className="card__stat" aria-label="Special defense">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  SpD
                </p>
                <p>{res.stats[4].base_stat}</p>
              </div>
              <progress value={res.stats[4].base_stat} max="255"></progress>
            </li>
            <li className="card__stat" aria-label="Speed">
              <div className="stat__value">
                <p className="stat__name" aria-hidden="true">
                  Spd
                </p>
                <p>{res.stats[5].base_stat}</p>
              </div>
              <progress value={res.stats[5].base_stat} max="255"></progress>
            </li>
          </ul>
        </section>
      </article>
    </li>
  );
};
