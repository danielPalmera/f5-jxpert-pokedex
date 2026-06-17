import { pokemonStat } from "../../types/Stats";
import { Stats } from "../../types/Stats";
export const CardProgressStat = ({ stat }: { stat: pokemonStat }) => {
  return (
    console.log(stat),
    (
      <li className="card__stat" aria-label="Health points">
        <div className="stat__value">
          <p className="stat__name" aria-hidden="true">
            {Stats[stat.name as keyof typeof Stats]?.StatShortName || stat.name}
          </p>
          <p>{stat.base}</p>
        </div>
        <progress value={stat.base} max="255"></progress>
      </li>
    )
  );
};
