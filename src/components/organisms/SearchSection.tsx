import { useEffect, useState } from "react";
import { Regions } from "../../types/Regions";
import { PokemonCard } from "../molecules/PokemonCard";
import { Loading } from "../atoms/Loading";
import { DropDownRegion } from "../atoms/DropDownRegion";
import { OrderControls } from "../atoms/OrderControls";

export const Search = () => {
  const [showregs, setShowregs] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(false);
  const [filtering, isFiltering] = useState<boolean>(false);
  const [result, setResult] = useState<any>([]);
  const [finalResult, setFinalResult] = useState<any>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [region, setRegion] = useState<string>("kanto");
  const [sorting, setSort] = useState<string>("default");

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
      isLoading(false);
    };
    getData();
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
      if (sorting === "specialAttack") {
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
      if (sorting === "specialDefense") {
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
    <>
      <section className="search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="search__icon"
        >
          <path
            d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
            stroke="var(--color-neutral-400)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L15 15"
            stroke="var(--color-neutral-400)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search a Pokémon..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <DropDownRegion
          region={region}
          showregs={showregs}
          showSort={showSort}
          onRegionChange={(key) => {
            setRegion(key);
            setShowregs(false);
          }}
          onToggle={() => {
            setShowregs((prev) => {
              if (showSort) setShowSort(false);
              return !prev;
            });
          }}
        />

        <OrderControls
          showSort={showSort}
          sorting={sorting}
          showregs={showregs}
          onSortChange={(value) => {
            setSort(value);
            setShowSort(false);
          }}
          onToggle={() => {
            setShowSort((prev) => {
              if (showregs) setShowregs(false);
              return !prev;
            });
          }}
        />
      </section>
      <section>
        {(loading || filtering) && <Loading />}
        {/* Prints cards */}
        {!filtering && !loading && finalResult.length > 0 && (
          <ul className="grid">
            {finalResult.map((res) => {
              return <PokemonCard key={`pokemon-card-${res.id}`} data={res} />;
            })}
          </ul>
        )}
      </section>
      {!loading && finalResult.length === 0 && (
        <p className="noresults">No results for "{busqueda}"</p>
      )}
    </>
  );
};
