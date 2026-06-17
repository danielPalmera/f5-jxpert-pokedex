import { useEffect, useState } from "react";
import { Header } from "./components/atoms/Header";
import { Footer } from "./components/atoms/Footer";
import { Loading } from "./components/atoms/Loading";
import { PokemonCard } from "./components/molecules/PokemonCard";
import { Search } from "./components/organisms/SearchSection";
import { Regions } from "./types/Regions";

export const App2 = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const [filtering, isFiltering] = useState<boolean>(false);
  const [result, setResult] = useState<any>([]);
  const [finalResult, setFinalResult] = useState<any>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [region, setRegion] = useState<string>("kanto");
  const [showRegions, isShowRegions] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<any>(false);
  const [sorting, setSort] = useState<any>("default");

  useEffect(() => {
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getData = async () => {
      isLoading(true);
      isFiltering(true);

      const { start: regStart, end: regEnd } = Regions[region] ?? Regions.kanto;

      const { results }: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${regStart}&limit=${regEnd}`,
      ).then((res) => res.json());
      const result = await Promise.all(
        results.map(async ({ url }) => {
          const data = await fetch(url).then((res) => res.json());
          return {
            ...data,
            stats: data.stats.map((s) => ({
              name: s.stat.name,
              base: String(s.base_stat),
            })),
          };
        }),
      );
      setResult(result);
      setFinalResult(result);
      isLoading(false);
    };
    getData();
    console.log("Región cambiada a:", region);
  }, [region]);
  /**
   * Filters results based on input query term.
   */
  useEffect(() => {
    setFinalResult(
      result.filter(
        (res) =>
          res.name.includes(busqueda.toLowerCase()) ||
          !!res.types.find((type) =>
            type.type.name.startsWith(busqueda.toLowerCase()),
          ),
      ),
    );
    isFiltering(false);
  }, [result[0]?.id, busqueda]);
  /**
   * Sorts results based on selected sorting criteria.
   */
  useEffect(() => {
    if (sorting !== "default") {
      if (sorting === "hp") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.name === "hp");
            const bStat = b.stats.find((stat) => stat.name === "hp");
            return bStat.base - aStat.base;
          }),
        );
      }
      if (sorting === "attack") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.name === "attack");
            const bStat = b.stats.find((stat) => stat.name === "attack");
            return bStat.base - aStat.base;
          }),
        );
      }
      if (sorting === "defense") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.name === "defense");
            const bStat = b.stats.find((stat) => stat.name === "defense");
            return bStat.base - aStat.base;
          }),
        );
      }
      if (sorting === "special-attack") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.name === "special-attack",
            );
            const bStat = b.stats.find(
              (stat) => stat.name === "special-attack",
            );
            return bStat.base - aStat.base;
          }),
        );
      }
      if (sorting === "special-defense") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.name === "special-defense",
            );
            const bStat = b.stats.find(
              (stat) => stat.name === "special-defense",
            );
            return bStat.base - aStat.base;
          }),
        );
      }
      if (sorting === "speed") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.name === "speed");
            const bStat = b.stats.find((stat) => stat.name === "speed");
            return bStat.base - aStat.base;
          }),
        );
      }
    }
    if (sorting === "default") {
      setFinalResult((prev) =>
        [...prev].sort((a, b) => {
          return a.id - b.id;
        }),
      );
    }
  }, [finalResult[0]?.id, sorting]);

  return (
    <div className="layout">
      <Header title="Pokédex NEW2" />

      {/* Searcher */}
      <main className="container">
        <Search />
        {/* Muestra cartas cargando */}
        <section>
          {(loading || filtering) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
          )}
          {/* Prints cards */}
          {!filtering && !loading && finalResult.length > 0 && (
            <ul className="grid">
              {finalResult.map((res) => {
                return (
                  <PokemonCard key={`pokemon-card-${res.id}`} data={res} />
                );
              })}
            </ul>
          )}
        </section>
        {!loading && finalResult.length === 0 && (
          <p className="noresults">No results for "{busqueda}"</p>
        )}
      </main>
      <Footer />
    </div>
  );
};
