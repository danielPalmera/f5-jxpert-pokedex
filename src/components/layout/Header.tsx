import pokeball from "../../assets/images/pokeball.svg";
import dreamTeam from "../../assets/images/dream-team.png";

export const Header = ({
  title,
  favoritesCount,
  onNavHome,
  onNavFav,
}: {
  title: string;
  favoritesCount?: number;
  onNavHome?: () => void;
  onNavFav?: () => void;
}) => {
  return (
    <header className="header">
      <div className="header__left">
        <img
          src={pokeball}
          alt=""
          className="header__logo"
          onClick={onNavHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onNavHome?.();
          }}
        />
        <p onClick={onNavHome} className="header__title">
          {title}
        </p>
      </div>
      {favoritesCount !== undefined && favoritesCount > 0 && (
        <div
          className="header__dream"
          onClick={onNavFav}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onNavFav?.();
          }}
        >
          <img src={dreamTeam} alt="" className="header__dream-img" />
          <span className="header__dream-text">Dream Team</span>
        </div>
      )}
    </header>
  );
};
