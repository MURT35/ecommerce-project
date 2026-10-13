import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { CheckOutHeader } from "./CheckOutHeader";

describe("CheckOutHeader component", () => {
  const cart = [{ quantity: 2 }, { quantity: 1 }];

  it("displays the item count", () => {
    render(
      <MemoryRouter>
        <CheckOutHeader cart={cart} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "3 item" })).toBeInTheDocument();
    const sources = screen.getAllByRole("img").map((img) => img.getAttribute("src"));
    expect(sources).toContain("images/logo.png");
    expect(sources).toContain("images/icons/checkout-lock-icon.png");
  });

  it("returns home when the item link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route path="/checkout" element={<CheckOutHeader cart={cart} />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: "3 item" }));

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
