import { Header } from "./components/atoms/Header";
import { Footer } from "./components/atoms/Footer";
import { Search } from "./components/organisms/SearchSection";

export const App2 = () => {
  return (
    <div className="layout">
      <Header title="Pokédex NEW2" />
      <main className="container">
        <Search />
      </main>
      <Footer />
    </div>
  );
};
