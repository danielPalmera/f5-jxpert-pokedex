import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Search } from "../components/organisms/SearchSection";
import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

export const App2 = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Header title="Pokédex" favoritesCount={favorites.length} onNavHome={() => navigate("/")} onNavFav={() => navigate("/favorites")} />
      <main className="container">
        <Search isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </main>
      <Footer />
    </div>
  );
};
