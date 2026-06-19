import { CardTagNumber } from "../atoms/CardTagNumber";
import { CardTagTypeList } from "./CardTagTypeList";
import { CardProgressStat } from "../atoms/CardProgressStat";
import { PokemonCardData, PokemonStat } from "../../types/PokemonCardData";
import { Stats } from "../../constants/Stats";

export const PokemonCard = ({ data }: { data: PokemonCardData }) => {
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
          <h3 className="card__title">{data.name}</h3>
          <ul aria-description="Stats resume">
            {data.stats.map((stat: PokemonStat, index: number) => {
              const statInfo = Object.values(Stats).find(
                (s) => s.apiStatName === stat.name,
              );
              return (
                <CardProgressStat
                  key={`pokemon-card-${data.id}-stat-${index}`}
                  base={stat.base}
                  shortName={statInfo?.StatShortName || stat.name}
                />
              );
            })}
          </ul>
        </section>
      </article>
    </li>
  );
};
