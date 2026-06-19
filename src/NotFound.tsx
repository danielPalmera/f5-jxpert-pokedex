import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import errorImg from "./assets/images/pokedex.png";

export const NotFound = () => {
  return (
    <div className="layout">
      <Header title="Pokédex" />
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
