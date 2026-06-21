import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FloatingTab } from "./FloatingTab";

describe("FloatingTab", () => {
  it("renders the party mode button", () => {
    render(<FloatingTab party={false} onToggleParty={vi.fn()} />);
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  it("applies active class when party is true", () => {
    render(<FloatingTab party={true} onToggleParty={vi.fn()} />);
    expect(screen.getByText("P")).toHaveClass("floating-tab__btn--active");
  });

  it("does not have active class when party is false", () => {
    render(<FloatingTab party={false} onToggleParty={vi.fn()} />);
    expect(screen.getByText("P")).not.toHaveClass("floating-tab__btn--active");
  });

  it("calls onToggleParty when clicked", async () => {
    const onToggle = vi.fn();
    render(<FloatingTab party={false} onToggleParty={onToggle} />);
    await userEvent.click(screen.getByText("P"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
