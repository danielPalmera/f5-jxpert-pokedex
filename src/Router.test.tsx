import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App2 } from "./pages/App2";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";

describe("Router", () => {
  it("renders home page on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<App2 />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });

  it("renders favorites page on /favorites", () => {
    render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <Routes>
          <Route path="/" element={<App2 />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Dream Team")).toBeInTheDocument();
  });

  it("renders 404 page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/nonexistent"]}>
        <Routes>
          <Route path="/" element={<App2 />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
