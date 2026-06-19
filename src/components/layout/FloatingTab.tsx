export const FloatingTab = ({
  onNavOld,
  onNavNew,
  onNavFav,
  onToggleParty,
  party,
}: {
  onNavOld: () => void;
  onNavNew: () => void;
  onNavFav: () => void;
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
      {import.meta.env.DEV && (
        <button className="floating-tab__btn" onClick={onNavFav}>
          F
        </button>
      )}
      <button
        className={`floating-tab__btn${party ? " floating-tab__btn--active" : ""}`}
        onClick={onToggleParty}
      >
        P
      </button>
    </aside>
  );
};
