export const FloatingTab = ({
  onToggleParty,
  party,
}: {
  onToggleParty: () => void;
  party: boolean;
}) => {
  return (
    <aside className="floating-tab">
      <button
        className={`floating-tab__btn${party ? " floating-tab__btn--active" : ""}`}
        onClick={onToggleParty}
      >
        P
      </button>
    </aside>
  );
};
