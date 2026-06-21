import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegionDropdown } from "./RegionDropdown";

describe("RegionDropdown", () => {
  it("renders all regions as options", () => {
    render(<RegionDropdown region="kanto" onRegionChange={vi.fn()} />);
    expect(screen.getByText("kanto")).toBeInTheDocument();
    expect(screen.getByText("johto")).toBeInTheDocument();
    expect(screen.getByText("paldea")).toBeInTheDocument();
  });

  it("marks the current region as active", () => {
    render(<RegionDropdown region="johto" onRegionChange={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "johto" })).toHaveAttribute("aria-checked", "true");
  });

  it("calls onRegionChange when an option is clicked", async () => {
    const onChange = vi.fn();
    render(<RegionDropdown region="kanto" onRegionChange={onChange} />);
    await userEvent.click(screen.getByText("hoenn"));
    expect(onChange).toHaveBeenCalledWith("hoenn");
  });
});
