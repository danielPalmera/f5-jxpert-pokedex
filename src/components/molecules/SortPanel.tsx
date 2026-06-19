import { SortFiltersOptions } from "../../constants/Stats";

export const SortPanel = ({
  sorting,
  onSortChange,
}: {
  sorting: string;
  onSortChange: (sort: string) => void;
}) => {
  return (
    <article className="sort__wrapper">
      <h3 className="sort__title">Sort by</h3>
      <div className="sort__items" role="listbox" id="sort-list">
        {Object.entries(SortFiltersOptions).map(([key, opt]) => (
          <span
            key={key}
            role="radio"
            aria-label={opt.label}
            tabIndex={0}
            className={`sort__pill ${sorting === key ? "active" : ""}`}
            aria-checked={sorting === key}
            onClick={() => onSortChange(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSortChange(key);
            }}
          >
            {opt.StatShortName}
          </span>
        ))}
      </div>
    </article>
  );
};
