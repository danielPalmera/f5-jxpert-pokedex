import { Footer } from './components/atoms/Footer';
import { Header } from './components/atoms/Header';
import { Search } from './components/organisms/SearchSection';

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
