import { CardTagType } from "../atoms/CardTagType";
import { TypesPokemon } from "../../types/Pokemons";

export const CardTagTypeList = ({ res }: { res: any }) => {
  return (
    <div className="card__tag">
      {res.map((type: any, index: number) => (
        <CardTagType
          key={type.type.name}
          typeName={
            TypesPokemon.find((t) => t.name === type.type.name)?.iconImg || ""
          }
          isPrimary={index === 0}
        />
      ))}
    </div>
  );
};
