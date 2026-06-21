import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the title", () => {
    render(<Header title="Pokédex" />);
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });

  it("does not show Dream Team when favoritesCount is 0", () => {
    render(<Header title="Pokédex" favoritesCount={0} />);
    expect(screen.queryByText("Dream Team")).not.toBeInTheDocument();
  });

  it("shows Dream Team when favoritesCount > 0", () => {
    render(<Header title="Pokédex" favoritesCount={3} />);
    expect(screen.getByText("Dream Team")).toBeInTheDocument();
  });

  it("shows Dream Team when favoritesCount is undefined", () => {
    render(<Header title="Pokédex" />);
    expect(screen.queryByText("Dream Team")).not.toBeInTheDocument();
  });

  it("calls onNavHome when title is clicked", async () => {
    const onNavHome = vi.fn();
    render(<Header title="Pokédex" onNavHome={onNavHome} />);
    await userEvent.click(screen.getByText("Pokédex"));
    expect(onNavHome).toHaveBeenCalledTimes(1);
  });

  it("calls onNavFav when Dream Team is clicked", async () => {
    const onNavFav = vi.fn();
    render(<Header title="Pokédex" favoritesCount={3} onNavFav={onNavFav} />);
    await userEvent.click(screen.getByText("Dream Team"));
    expect(onNavFav).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation for Dream Team", async () => {
    const onNavFav = vi.fn();
    render(<Header title="Pokédex" favoritesCount={3} onNavFav={onNavFav} />);
    const dreamTeam = screen.getByText("Dream Team").closest("[tabindex]")!;
    dreamTeam.focus();
    await userEvent.keyboard("{Enter}");
    expect(onNavFav).toHaveBeenCalledTimes(1);
  });
});
