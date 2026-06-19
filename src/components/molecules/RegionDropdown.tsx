import { Regions } from "../../constants/Regions";

export const RegionDropdown = ({
  region,
  onRegionChange,
}: {
  region: string;
  onRegionChange: (region: string) => void;
}) => {
  return (
    <ol
      role="listbox"
      id="reg-list"
      className="dropdown__list"
    >
      {Object.keys(Regions).map((key) => (
        <li
          key={key}
          role="radio"
          aria-checked={region === key}
          tabIndex={0}
          className={region === key ? "active" : ""}
          onClick={() => onRegionChange(key)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRegionChange(key);
          }}
        >
          {key}
        </li>
      ))}
    </ol>
  );
};
