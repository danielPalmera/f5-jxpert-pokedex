import { useState, useRef } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useFavorites, getSpriteUrl } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import "../assets/styles/favorites.css";

export const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const sorted = [...favorites].sort((a, b) => b.height - a.height);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = favorites.find((f) => f.id === selectedId);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayImgRef = useRef<HTMLImageElement | null>(null);

  const open = (id: number) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlayImgRef.current?.classList.add("favorites-overlay-img--open");
      });
    });
  };

  const close = () => {
    overlayRef.current?.classList.add("closing");
    overlayImgRef.current?.classList.remove("favorites-overlay-img--open");
    setTimeout(() => {
      setSelectedId(null);
      overlayRef.current?.classList.remove("closing");
    }, 250);
  };

  return (
    <div className="layout">
      <Header title="Pokédex" favoritesCount={favorites.length} onNavHome={() => navigate("/")} onNavFav={() => navigate("/favorites")} />
      <main className="container favorites-wrapper">
        <div className="favorites-outer">
          <div className="favorites-inner">
            <div className="favorites-chip-top">Dream Team</div>
            <div className="favorites-stack">
              {(() => {
                const maxH = Math.max(...sorted.map((f) => f.height), 1);
                return sorted.map((fav, index) => {
                  const ratio = fav.height / maxH;
                  const px = Math.max(ratio * 400, 50);

                  let pos: Record<string, string | number> = { bottom: 0 };
                  if (index === 0) {
                    pos.left = "50%";
                    pos.transform = "translateX(-50%)";
                  } else if (index === 1) {
                    pos.left = "5%";
                  } else if (index === 2) {
                    pos.right = "5%";
                  } else {
                    const i = index - 3;
                    pos.left = `${15 + i * 30}%`;
                  }

                  return (
                    <img
                      key={fav.id}
                      src={getSpriteUrl(fav.id)}
                      alt={fav.name}
                      className="favorites-stack-img"
                      style={{ zIndex: index + 1, width: px, ...pos }}
                      onClick={() => open(fav.id)}
                    />
                  );
                });
              })()}
            </div>
            <div className="favorites-chip-bottom">
              {favorites.map((fav) => (
                <img
                  key={fav.id}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fav.id}.png`}
                  alt={fav.name}
                  className="favorites-sprite"
                />
              ))}
            </div>
          </div>
        </div>

        {selected && (
          <div ref={overlayRef} className="favorites-overlay" onClick={close}>
            <img
              ref={overlayImgRef}
              src={getSpriteUrl(selected.id)}
              alt={selected.name}
              className="favorites-overlay-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <pre className="favorites-storage">
          {JSON.stringify(favorites, null, 2)}
        </pre>
      </main>
      <Footer />
    </div>
  );
};
