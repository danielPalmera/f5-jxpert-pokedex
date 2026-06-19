import { Stats } from '../../constants/Stats';
import { SortFilterOption, pokemonStat } from '../../types/Stats';

export const CardProgressStat = ({ stat }: { stat: pokemonStat }) => {
  const statInfo = (Object.values(Stats) as SortFilterOption[]).find(
    (s) => s.apiStatName === stat.name
  );
  return (
    <li className="card__stat" aria-label="Health points">
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {statInfo?.StatShortName || stat.name}
        </p>
        <p>{stat.base}</p>
      </div>
      <progress value={stat.base} max="255"></progress>
    </li>
  );
};
