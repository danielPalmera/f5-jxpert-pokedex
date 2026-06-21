import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardTagNumber } from "./CardTagNumber";

describe("CardTagNumber", () => {
  it("renders padded 3-digit number for id 1", () => {
    render(<CardTagNumber id={1} />);
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("renders padded number for id 123", () => {
    render(<CardTagNumber id={123} />);
    expect(screen.getByText("#123")).toBeInTheDocument();
  });

  it("renders 4 digits for id 1000", () => {
    render(<CardTagNumber id={1000} />);
    expect(screen.getByText("#1000")).toBeInTheDocument();
  });
});
