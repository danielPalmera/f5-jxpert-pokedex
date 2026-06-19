import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Search } from "../components/organisms/SearchSection";

export const App2 = () => {
  return (
    <div className="layout">
      <Header title="Pokédex" />
      <main className="container">
        <Search />
      </main>
      <Footer />
    </div>
  );
};
