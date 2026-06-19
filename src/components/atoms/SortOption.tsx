export const SortOption = ({
  value,
  label,
  shortName,
  isActive,
  onSelect,
}: {
  value: string;
  label: string;
  shortName: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}) => {
  return (
    <span
      role="radio"
      aria-label={label}
      tabIndex={0}
      className={`sort__pill ${isActive ? "active" : ""}`}
      aria-checked={isActive}
      onClick={() => onSelect(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(value);
      }}
    >
      {shortName}
    </span>
  );
};
