export const RegionOption = ({
  name,
  isActive,
  onSelect,
}: {
  name: string;
  isActive: boolean;
  onSelect: (name: string) => void;
}) => {
  return (
    <li
      role="radio"
      aria-checked={isActive}
      tabIndex={0}
      className={isActive ? "active" : ""}
      onClick={() => onSelect(name)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(name);
      }}
    >
      {name}
    </li>
  );
};
