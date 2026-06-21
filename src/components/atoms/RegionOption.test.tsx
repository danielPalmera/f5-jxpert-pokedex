import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegionOption } from "./RegionOption";

describe("RegionOption", () => {
  it("renders region name", () => {
    render(<RegionOption name="kanto" isActive={false} onSelect={vi.fn()} />);
    expect(screen.getByText("kanto")).toBeInTheDocument();
  });

  it("has aria-checked when active", () => {
    render(<RegionOption name="kanto" isActive={true} onSelect={vi.fn()} />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onSelect with name when clicked", async () => {
    const onSelect = vi.fn();
    render(<RegionOption name="johto" isActive={false} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("johto"));
    expect(onSelect).toHaveBeenCalledWith("johto");
  });

  it("calls onSelect on Enter key", async () => {
    const onSelect = vi.fn();
    render(<RegionOption name="hoenn" isActive={false} onSelect={onSelect} />);
    const el = screen.getByRole("radio");
    el.focus();
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("hoenn");
  });
});
