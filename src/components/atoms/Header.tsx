import pokeball from "../../assets/pokeball.svg";

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="header">
      <img src={pokeball} alt="" className="header__logo" />
      <p className="header__title">{title}</p>
    </header>
  );
};
