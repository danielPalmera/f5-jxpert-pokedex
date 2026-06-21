import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardTagTypeList } from "./CardTagTypeList";

describe("CardTagTypeList", () => {
  it("renders a CardTagType for each type", () => {
    const types = [{ type: { name: "grass" } }, { type: { name: "poison" } }];
    render(<CardTagTypeList res={types} />);
    expect(screen.getByLabelText("grass type primary")).toBeInTheDocument();
    expect(screen.getByLabelText("poison type secondary")).toBeInTheDocument();
  });

  it("renders single type as primary", () => {
    const types = [{ type: { name: "fire" } }];
    render(<CardTagTypeList res={types} />);
    expect(screen.getByLabelText("fire type primary")).toBeInTheDocument();
  });
});
