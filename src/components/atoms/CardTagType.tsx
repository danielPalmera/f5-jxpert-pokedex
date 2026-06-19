import spriteUrl from '../../assets/images/pokemon-types.svg';

export const CardTagType = ({ typeName, isPrimary }: { typeName: string; isPrimary?: boolean }) => {
  return (
    <svg
      className="card__type"
      width={24}
      height={24}
      role="img"
      aria-label={`${typeName} type ${isPrimary ? 'primary' : 'secondary'}`}
    >
      <use href={`${spriteUrl}#${typeName}`} />
    </svg>
  );
};
