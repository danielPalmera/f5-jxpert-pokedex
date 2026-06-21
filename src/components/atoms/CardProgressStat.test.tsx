import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardProgressStat } from "./CardProgressStat";

describe("CardProgressStat", () => {
  it("renders stat short name and base value", () => {
    render(<CardProgressStat base={45} shortName="Hp" />);
    expect(screen.getByText("Hp")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("progress element has correct value and max", () => {
    render(<CardProgressStat base={100} shortName="At" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "100");
    expect(progress).toHaveAttribute("max", "255");
  });

  it("li element has Health points aria-label", () => {
    render(<CardProgressStat base={50} shortName="Df" />);
    expect(screen.getByLabelText("Health points")).toBeInTheDocument();
  });
});
