import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegionToggle } from "./RegionToggle";

describe("RegionToggle", () => {
  it("renders the current region", () => {
    render(<RegionToggle region="kanto" showregs={false} onToggle={vi.fn()} />);
    expect(screen.getByText("kanto")).toBeInTheDocument();
  });

  it("aria-expanded reflects showregs state", () => {
    const { rerender } = render(
      <RegionToggle region="kanto" showregs={false} onToggle={vi.fn()} />,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");

    rerender(<RegionToggle region="kanto" showregs={true} onToggle={vi.fn()} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    render(<RegionToggle region="kanto" showregs={false} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
