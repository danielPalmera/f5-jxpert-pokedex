import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortOption } from "./SortOption";

describe("SortOption", () => {
  it("renders shortName", () => {
    render(<SortOption value="hp" label="HP" shortName="Hp" isActive={false} onSelect={vi.fn()} />);
    expect(screen.getByText("Hp")).toBeInTheDocument();
  });

  it("has aria-checked when active", () => {
    render(<SortOption value="hp" label="HP" shortName="Hp" isActive={true} onSelect={vi.fn()} />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });

  it("has aria-label", () => {
    render(<SortOption value="hp" label="HP" shortName="Hp" isActive={false} onSelect={vi.fn()} />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-label", "HP");
  });

  it("calls onSelect with value when clicked", async () => {
    const onSelect = vi.fn();
    render(<SortOption value="attack" label="At" shortName="At" isActive={false} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("radio"));
    expect(onSelect).toHaveBeenCalledWith("attack");
  });

  it("calls onSelect on Enter key", async () => {
    const onSelect = vi.fn();
    render(<SortOption value="speed" label="Spd" shortName="Spd" isActive={false} onSelect={onSelect} />);
    const el = screen.getByRole("radio");
    el.focus();
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("speed");
  });
});
