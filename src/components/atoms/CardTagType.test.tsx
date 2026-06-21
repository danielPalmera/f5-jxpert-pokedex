import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardTagType } from "./CardTagType";

describe("CardTagType", () => {
  it("renders with correct aria-label for primary type", () => {
    render(<CardTagType typeName="fire" isPrimary />);
    expect(screen.getByLabelText("fire type primary")).toBeInTheDocument();
  });

  it("renders with correct aria-label for secondary type", () => {
    render(<CardTagType typeName="water" />);
    expect(screen.getByLabelText("water type secondary")).toBeInTheDocument();
  });

  it("renders as an img role", () => {
    render(<CardTagType typeName="grass" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
