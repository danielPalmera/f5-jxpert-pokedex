import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkeletonGrid } from "./SkeletonGrid";

describe("SkeletonGrid", () => {
  it("renders 6 skeleton cards", () => {
    const { container } = render(<SkeletonGrid />);
    expect(container.querySelectorAll(".card-placeholder")).toHaveLength(6);
  });

  it("has aria-hidden attribute", () => {
    const { container } = render(<SkeletonGrid />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
