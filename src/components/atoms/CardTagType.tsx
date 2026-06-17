export const CardTagType = ({
  typeName,
  isPrimary,
}: {
  typeName: string;
  isPrimary?: boolean;
}) => {
  return (
    <img
      src={typeName}
      className="card__type"
      alt={`${typeName} type ${isPrimary ? "primary" : "secondary"}`}
    />
  );
};
