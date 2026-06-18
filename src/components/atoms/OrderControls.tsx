import { SortFiltersOptions } from "../../constants/Stats";
interface Props {
  showSort: boolean;
  sorting: string;
  showregs: boolean;
  onSortChange: (sort: string) => void;
  onToggle: () => void;
}

export const OrderControls = ({
  showSort,
  sorting,
  showregs,
  onSortChange,
  onToggle,
}: Props) => {
  return (
    <>
      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="sort-list"
        aria-label="Sort by"
        aria-expanded={showSort}
        className="sort__button"
        onClick={onToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={showSort ? "var(--color-accent)" : "var(--color-neutral-700)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l9 0" />
          <path d="M4 12l7 0" />
          <path d="M4 18l7 0" />
          <path d="M15 15l3 3l3 -3" />
          <path d="M18 6l0 12" />
        </svg>
      </button>

      {showSort && (
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
      )}
    </>
  );
};
