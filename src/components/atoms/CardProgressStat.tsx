export const CardProgressStat = ({
  base,
  shortName,
}: {
  base: number;
  shortName: string;
}) => {
  return (
    <li className="card__stat" aria-label="Health points">
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {shortName}
        </p>
        <p>{base}</p>
      </div>
      <progress value={base} max="255"></progress>
    </li>
  );
};
