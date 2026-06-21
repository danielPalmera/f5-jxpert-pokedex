import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortToggle } from "./SortToggle";

describe("SortToggle", () => {
  it("renders the toggle button", () => {
    render(<SortToggle showSort={false} onToggle={vi.fn()} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("aria-expanded reflects showSort state", () => {
    const { rerender } = render(<SortToggle showSort={false} onToggle={vi.fn()} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");

    rerender(<SortToggle showSort={true} onToggle={vi.fn()} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    render(<SortToggle showSort={false} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
