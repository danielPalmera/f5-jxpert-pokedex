import { useEffect, useState } from "react";
export const Search = () => {
  const [busqueda, setBusqueda] = useState<any>("");
  const [reg, setreg] = useState<any>("kanto");
  const [showregs, setShowregs] = useState<any>(false);
  const [showSort, setShowSort] = useState<any>(false);
  const [sorting, setSort] = useState<any>("default");
  const [result, setResult] = useState<any>([]);
  const [finalResult, setFinalResult] = useState<any>([]);
  const [ldr, setLdr] = useState<any>(false);
  const [fltr, setFltr] = useState<any>(false);

  const regs = [
    "kanto",
    "johto",
    "hoenn",
    "sinnoh",
    "unova",
    "kalos",
    "alola",
    "galar",
    "paldea",
  ];
  useEffect(() => {
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getData = async () => {
      setLdr(true);
      setFltr(true);

      let regStart, regEnd;
      if (reg === "kanto") {
        regStart = 0;
        regEnd = 151;
      } else if (reg === "johto") {
        regStart = 151;
        regEnd = 100;
      } else if (reg === "hoenn") {
        regStart = 251;
        regEnd = 135;
      } else if (reg === "sinnoh") {
        regStart = 386;
        regEnd = 108;
      } else if (reg === "unova") {
        regStart = 494;
        regEnd = 155;
      } else if (reg === "kalos") {
        regStart = 649;
        regEnd = 72;
      } else if (reg === "alola") {
        regStart = 721;
        regEnd = 88;
      } else if (reg === "galar") {
        regStart = 809;
        regEnd = 96;
      } else if (reg === "paldea") {
        regStart = 905;
        regEnd = 120;
      } else {
        regStart = 0;
        regEnd = 151;
      }

      const { results }: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${regStart}&limit=${regEnd}`,
      ).then((res) => res.json());
      const result = await Promise.all(
        results.map(
          async ({ url }) => await fetch(url).then((res) => res.json()),
        ),
      );
      setResult(result);
      setFinalResult(result);
      setLdr(false);
    };
    getData();
  }, [reg]);
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
    setFltr(false);
  }, [result[0]?.id, busqueda]);
  /**
   * Sorts results based on selected sorting criteria.
   */
  useEffect(() => {
    if (sorting !== "default") {
      if (sorting === "hp") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "hp");
            const bStat = b.stats.find((stat) => stat.stat.name === "hp");
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sorting === "attack") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "attack");
            const bStat = b.stats.find((stat) => stat.stat.name === "attack");
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sorting === "defense") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "defense");
            const bStat = b.stats.find((stat) => stat.stat.name === "defense");
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sorting === "special-attack") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === "special-attack",
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === "special-attack",
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sorting === "special-defense") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find(
              (stat) => stat.stat.name === "special-defense",
            );
            const bStat = b.stats.find(
              (stat) => stat.stat.name === "special-defense",
            );
            return bStat.base_stat - aStat.base_stat;
          }),
        );
      }
      if (sorting === "speed") {
        setFinalResult((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "speed");
            const bStat = b.stats.find((stat) => stat.stat.name === "speed");
            return bStat.base_stat - aStat.base_stat;
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
      {/* Shows regions */}
      <div className="dropdown">
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="reg-list"
          aria-label="Select reg"
          aria-expanded={showregs}
          className={`dropdown__button ${showregs ? "active" : ""}`}
          onClick={() =>
            setShowregs((prev) => {
              if (showSort) {
                setShowSort(false);
              }
              return !prev;
            })
          }
        >
          {reg}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
              stroke="var(--color-neutral-600)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6667 10L8.00004 12.6667L5.33337 10"
              stroke="var(--color-neutral-600)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <ol
          role="listbox"
          id="reg-list"
          hidden={!showregs}
          className={`dropdown__list ${!showregs ? "hide" : ""}`}
        >
          {regs.map((key) => (
            <li
              key={key}
              role="radio"
              aria-checked={reg === key}
              tabIndex={0}
              className={reg === key ? "active" : ""}
              onClick={() => {
                setreg(key);
                setShowregs(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setreg(key);
                  setShowregs(false);
                }
              }}
            >
              {key}
            </li>
          ))}
        </ol>
      </div>

      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="sort-list"
        aria-label="Sort by"
        aria-expanded={showSort}
        className="sort__button"
        onClick={() =>
          setShowSort((prev) => {
            if (showregs) setShowregs(false);
            return !prev;
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={showSort ? "var(--color-accent)" : "var(--color-neutral-700)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l9 0" />
          <path d="M4 12l7 0" />
          <path d="M4 18l7 0" />
          <path d="M15 15l3 3l3 -3" />
          <path d="M18 6l0 12" />
        </svg>
      </button>

      {/* Muestra el menú de ordenación */}
      {showSort && (
        <article className="sort__wrapper">
          <h3 className="sort__title">Sort by</h3>
          <div className="sort__items" role="listbox" id="sort-list">
            <span
              role="radio"
              aria-label="Default"
              tabIndex={0}
              className={`sort__pill ${sorting === "default" ? "active" : ""}`}
              aria-checked={sorting === "default"}
              onClick={() => {
                setSort("default");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("default");
                  setShowSort(false);
                }
              }}
            >
              {" "}
              Default
            </span>
            <span
              role="radio"
              aria-label="Health points"
              tabIndex={0}
              className={`sort__pill ${sorting === "hp" ? "active" : ""}`}
              aria-checked={sorting === "hp"}
              onClick={() => {
                setSort("hp");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("hp");
                  setShowSort(false);
                }
              }}
            >
              {" "}
              Hp
            </span>
            <span
              role="radio"
              aria-label="Attack"
              tabIndex={0}
              className={`sort__pill ${sorting === "attack" ? "active" : ""}`}
              aria-checked={sorting === "attack"}
              onClick={() => {
                setSort("attack");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("attack");
                  setShowSort(false);
                }
              }}
            >
              {" "}
              At
            </span>
            <span
              role="radio"
              aria-label="Defense"
              tabIndex={0}
              className={`sort__pill ${sorting === "defense" ? "active" : ""}`}
              aria-checked={sorting === "defense"}
              onClick={() => {
                setSort("defense");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("defense");
                  setShowSort(false);
                }
              }}
            >
              Df
            </span>
            <span
              role="radio"
              aria-label="Special attack"
              tabIndex={0}
              className={`sort__pill ${
                sorting === "specialAttack" ? "active" : ""
              }`}
              aria-checked={sorting === "specialAttack"}
              onClick={() => {
                setSort("specialAttack");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("specialAttack");
                  setShowSort(false);
                }
              }}
            >
              {" "}
              SpA
            </span>
            <span
              role="radio"
              aria-label="Special defense"
              tabIndex={0}
              className={`sort__pill ${
                sorting === "specialDefense" ? "active" : ""
              }`}
              aria-checked={sorting === "specialDefense"}
              onClick={() => {
                setSort("specialDefense");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("specialDefense");
                  setShowSort(false);
                }
              }}
            >
              SpD
            </span>
            <span
              role="radio"
              aria-label="Speed"
              tabIndex={0}
              className={`sort__pill ${sorting === "speed" ? "active" : ""}`}
              aria-checked={sorting === "speed"}
              onClick={() => {
                setSort("speed");
                setShowSort(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSort("speed");
                  setShowSort(false);
                }
              }}
            >
              {" "}
              Spd
            </span>
          </div>
        </article>
      )}
    </section>
  );
};
