export const CardTagNumber = ({ id }: { id: number }) => {
  return (
    <div className="card__tag">
      <p>#{id.toString().padStart(3, '0')}</p>
    </div>
  );
};
