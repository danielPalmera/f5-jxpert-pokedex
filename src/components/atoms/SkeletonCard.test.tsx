import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkeletonCard } from "./SkeletonCard";

describe("SkeletonCard", () => {
  it("renders a placeholder card", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toHaveClass("card-placeholder");
  });

  it("contains a pokeball SVG", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
