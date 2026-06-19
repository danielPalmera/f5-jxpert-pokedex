import { CardTagNumber } from "../atoms/CardTagNumber";
import { CardTagTypeList } from "./CardTagTypeList";
import { CardProgressStat } from "../atoms/CardProgressStat";
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
          <button
            className={`card__fav-btn${isFav ? " card__fav-btn--active" : ""}`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            onClick={onToggleFav}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
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
