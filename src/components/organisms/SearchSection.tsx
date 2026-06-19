import { useState } from "react";
import { usePokemonData } from "../../hooks/usePokemonData";
import { usePokemonFilter } from "../../hooks/usePokemonFilter";
import { usePokemonSort } from "../../hooks/usePokemonSort";
import { PokemonCard } from "../molecules/PokemonCard";
import { SkeletonGrid } from "../molecules/SkeletonGrid";
import { RegionToggle } from "../atoms/RegionToggle";
import { RegionDropdown } from "../molecules/RegionDropdown";
import { SortToggle } from "../atoms/SortToggle";
import { SortPanel } from "../molecules/SortPanel";
import errorImg from "../../assets/images/pokedex.png";

export const Search = () => {
  const [showregs, setShowregs] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>("");
  const [region, setRegion] = useState<string>("kanto");
  const [sorting, setSort] = useState<string>("default");
  const { result, loading, error } = usePokemonData(region);
  const filtered = usePokemonFilter(result, busqueda);
  const sorted = usePokemonSort(filtered, sorting);

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

        <div className="dropdown">
          <RegionToggle
            region={region}
            showregs={showregs}
            onToggle={() => {
              setShowregs((prev) => {
                if (showSort) setShowSort(false);
                return !prev;
              });
            }}
          />
          {showregs && (
            <RegionDropdown
              region={region}
              onRegionChange={(key) => {
                setRegion(key);
                setShowregs(false);
              }}
            />
          )}
        </div>

        <SortToggle
          showSort={showSort}
          onToggle={() => {
            setShowSort((prev) => {
              if (showregs) setShowregs(false);
              return !prev;
            });
          }}
        />
        {showSort && (
          <SortPanel
            sorting={sorting}
            onSortChange={(value) => {
              setSort(value);
              setShowSort(false);
            }}
          />
        )}
      </section>
      <section>
        {error && (
          <p className="error">
            <img src={errorImg} alt="Error" width={500} />
          </p>
        )}
        {loading && <SkeletonGrid />}
        {!loading && sorted.length > 0 && (
          <ul className="grid">
            {sorted.map((res) => {
              return <PokemonCard key={`pokemon-card-${res.id}`} data={res} />;
            })}
          </ul>
        )}
      </section>
      {!loading && sorted.length === 0 && !error && (
        <p className="noresults">No results for "{busqueda}"</p>
      )}
    </>
  );
};
