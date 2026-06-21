import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PokemonCard } from "./PokemonCard";
import { bulbasaur } from "../../test/fixtures/pokemonCards";

const mockCardStats = [
  { base: 45, shortName: "Hp" },
  { base: 49, shortName: "At" },
];

describe("PokemonCard", () => {
  it("renders the pokemon name", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders the artwork image", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    const img = screen.getByAltText("bulbasaur artwork");
    expect(img).toHaveAttribute("src", "https://example.com/1.png");
  });

  it("renders the id tag", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("renders stat bars", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    expect(screen.getByText("Hp")).toBeInTheDocument();
    expect(screen.getByText("At")).toBeInTheDocument();
  });

  it("renders type tags with correct labels", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    expect(screen.getByLabelText("grass type primary")).toBeInTheDocument();
    expect(screen.getByLabelText("poison type secondary")).toBeInTheDocument();
  });

  it("calls onToggleFav when fav button clicked", async () => {
    const onToggle = vi.fn();
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} onToggleFav={onToggle} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("sets --color-type CSS variable", () => {
    render(<PokemonCard data={bulbasaur} cardStats={mockCardStats} />);
    const article = screen.getByRole("article");
    expect(article.style.getPropertyValue("--color-type")).toBe("var(--color-grass)");
  });
});
