import { CardTagNumber } from "../atoms/CardTagNumber";
import { CardTagTypeList } from "./CardTagTypeList";
import { CardProgressStat } from "../atoms/CardProgressStat";
import { FavButton } from "../atoms/FavButton";
import { PokemonCardData, PokemonCardStat } from "../../types/PokemonCardData";

export const PokemonCard = ({ data, cardStats, isFav, onToggleFav }: { data: PokemonCardData; cardStats: PokemonCardStat[]; isFav?: boolean; onToggleFav?: () => void }) => {
  const customStyles: any = {
    "--color-type": `var(--color-${data.types[0].type.name})`,
  };

  return (
    <li key={`pokemon-card-${data.id}`}>
      <article
        className={`card ${data.types[0].type.name}`}
        style={customStyles}
      >
        <div className="effect-container"></div>
        <header className="card__head">
          <CardTagNumber id={data.id} />
          <CardTagTypeList res={data.types} />
        </header>
        <img
          className="card__avatar"
          src={data.sprites.other["official-artwork"].front_default}
          loading="lazy"
          alt={`${data.name} artwork`}
        />
        <section className="card__content">
          <FavButton isFav={isFav} onClick={onToggleFav} />
          <h3 className="card__title">{data.name}</h3>
          <ul aria-description="Stats resume">
            {cardStats.map((stat, index) => (
              <CardProgressStat
                key={`pokemon-card-${data.id}-stat-${index}`}
                base={stat.base}
                shortName={stat.shortName}
              />
            ))}
          </ul>
        </section>
      </article>
    </li>
  );
};
