import { Regions } from "../../constants/Regions";
import { RegionOption } from "../atoms/RegionOption";

export const RegionDropdown = ({
  region,
  onRegionChange,
}: {
  region: string;
  onRegionChange: (region: string) => void;
}) => {
  return (
    <ol role="listbox" id="reg-list" className="dropdown__list">
      {Object.keys(Regions).map((key) => (
        <RegionOption
          key={key}
          name={key}
          isActive={region === key}
          onSelect={onRegionChange}
        />
      ))}
    </ol>
  );
};
