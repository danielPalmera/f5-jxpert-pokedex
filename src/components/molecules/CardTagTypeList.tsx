import { CardTagType } from "../atoms/CardTagType";

export const CardTagTypeList = ({ res }: { res: any }) => {
  return (
    <div className="card__tag">
      {res.map((type: any, index: number) => (
        <CardTagType
          key={type.type.name}
          typeName={type.type.name}
          isPrimary={index === 0}
        />
      ))}
    </div>
  );
};
