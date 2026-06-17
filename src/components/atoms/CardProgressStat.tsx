export const CardProgressStat = ({ res }: { res: any }) => {
  return (
    <li className="card__stat" aria-label="Health points">
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          Hp
        </p>
        <p>{res.stats[0].base_stat}</p>
      </div>
      <progress value={res.stats[0].base_stat} max="255"></progress>
    </li>
  );
};
