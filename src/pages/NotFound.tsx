import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import errorImg from "../assets/images/pokedex.png";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Header title="Pokédex" onNavHome={() => navigate("/")} />
      <main className="container">
        <p className="error">
          <img src={errorImg} alt="404" width={500} />
        </p>
        <p className="noresults">Page not found</p>
      </main>
      <Footer />
    </div>
  );
};
