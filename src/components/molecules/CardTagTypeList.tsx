import { CardTagType } from "../atoms/CardTagType";
import { PokemonType } from "../../types/PokemonCardData";

export const CardTagTypeList = ({ res }: { res: PokemonType[] }) => {
  return (
    <div className="card__tag">
      {res.map((type: PokemonType, index: number) => (
        <CardTagType
          key={type.type.name}
          typeName={type.type.name}
          isPrimary={index === 0}
        />
      ))}
    </div>
  );
};
