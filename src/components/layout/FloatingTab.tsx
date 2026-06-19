export const FloatingTab = ({
  onNavOld,
  onNavNew,
  onToggleParty,
  party,
}: {
  onNavOld: () => void;
  onNavNew: () => void;
  onToggleParty: () => void;
  party: boolean;
}) => {
  return (
    <aside className="floating-tab">
      <button className="floating-tab__btn" onClick={onNavOld}>
        O
      </button>
      <button className="floating-tab__btn" onClick={onNavNew}>
        N
      </button>
      <button
        className={`floating-tab__btn${party ? " floating-tab__btn--active" : ""}`}
        onClick={onToggleParty}
      >
        P
      </button>
    </aside>
  );
};
