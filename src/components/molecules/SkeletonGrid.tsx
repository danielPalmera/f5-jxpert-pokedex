import { SkeletonCard } from "../atoms/SkeletonCard";

const cards: JSX.Element[] = [];
for (let i = 0; i < 6; i++) {
  cards.push(<SkeletonCard key={`placeholder-card-${i}`} />);
}

export const SkeletonGrid = () => {
  return (
    <div className="grid" aria-hidden="true">
      {cards}
    </div>
  );
};
