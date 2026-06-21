import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NotFound } from "./NotFound";

describe("NotFound", () => {
  it("renders 404 message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
