import { PokemonStat } from "../../types/PokemonCardData";

export const CardProgressStat = ({
  stat,
  shortName,
}: {
  stat: PokemonStat;
  shortName: string;
}) => {
  return (
    <li className="card__stat" aria-label="Health points">
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {shortName}
        </p>
        <p>{stat.base}</p>
      </div>
      <progress value={stat.base} max="255"></progress>
    </li>
  );
};
