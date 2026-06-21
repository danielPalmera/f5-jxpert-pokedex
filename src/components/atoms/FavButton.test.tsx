import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FavButton } from "./FavButton";

describe("FavButton", () => {
  it("renders with 'Add to favorites' label when not favorite", () => {
    render(<FavButton />);
    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  });

  it("renders with 'Remove from favorites' label when favorite", () => {
    render(<FavButton isFav />);
    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FavButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has active class when isFav is true", () => {
    render(<FavButton isFav />);
    expect(screen.getByRole("button")).toHaveClass("card__fav-btn--active");
  });

  it("does not have active class when isFav is false", () => {
    render(<FavButton isFav={false} />);
    expect(screen.getByRole("button")).not.toHaveClass("card__fav-btn--active");
  });
});
