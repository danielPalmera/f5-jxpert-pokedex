import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortPanel } from "./SortPanel";

describe("SortPanel", () => {
  it("renders all sort options including default", () => {
    render(<SortPanel sorting="default" onSortChange={vi.fn()} />);
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Hp")).toBeInTheDocument();
    expect(screen.getByText("At")).toBeInTheDocument();
    expect(screen.getByText("Df")).toBeInTheDocument();
    expect(screen.getByText("SpA")).toBeInTheDocument();
    expect(screen.getByText("SpD")).toBeInTheDocument();
    expect(screen.getByText("Spd")).toBeInTheDocument();
  });

  it("marks current sort as active", () => {
    render(<SortPanel sorting="hp" onSortChange={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "Health points" })).toHaveAttribute("aria-checked", "true");
  });

  it("calls onSortChange when a sort option is clicked", async () => {
    const onChange = vi.fn();
    render(<SortPanel sorting="default" onSortChange={onChange} />);
    await userEvent.click(screen.getByText("At"));
    expect(onChange).toHaveBeenCalledWith("attack");
  });
});
