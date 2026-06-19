import { SortFiltersOptions } from "../../constants/Stats";
import { SortOption } from "../atoms/SortOption";

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
          <SortOption
            key={key}
            value={key}
            label={opt.label}
            shortName={opt.StatShortName}
            isActive={sorting === key}
            onSelect={onSortChange}
          />
        ))}
      </div>
    </article>
  );
};
