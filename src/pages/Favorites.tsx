import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import "../assets/styles/favorites.css";

const POKEMON_IDS = [1, 4, 7, 25, 132, 150];

export const Favorites = () => {
  return (
    <div className="layout">
      <Header title="Pokédex" />
      <main className="container favorites-wrapper">
        <div className="favorites-outer">
          <div className="favorites-inner">
            <div className="favorites-chip-top">Dream Team</div>
            <div className="favorites-chip-bottom">
              {POKEMON_IDS.map((id) => (
                <img
                  key={id}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={`Pokémon ${id}`}
                  className="favorites-sprite"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
