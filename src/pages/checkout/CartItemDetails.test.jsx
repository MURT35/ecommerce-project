import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import axios from "axios";
import { CartItem } from "./CartItemDetails";

vi.mock("axios");

describe("CartItem component", () => {
  let cartItem;
  let selectedDeliveryOption;
  let loadCart;
  let user;
  const deliveryTimeMs = 1723716000000;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    loadCart = vi.fn();
    cartItem = {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
      product: {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        priceCents: 1090,
      },
    };
    selectedDeliveryOption = {
      id: "1",
      priceCents: 0,
      estimatedDeliveryTimeMs: deliveryTimeMs,
    };
  });

  function renderCartItem() {
    render(
      <CartItem
        Cartitem={cartItem}
        selectedDeliveryOption={selectedDeliveryOption}
        loadCart={loadCart}
      />
    );
  }

  it("displays the cart item", () => {
    renderCartItem();

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("10.90")).toBeInTheDocument();
    expect(screen.getByText("2", { selector: ".quantity-label" })).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(
      screen.getByText(
        `Delivery date: ${dayjs(deliveryTimeMs).format("dddd, MMMM D")}`
      )
    ).toBeInTheDocument();
  });

  it("updates the quantity", async () => {
    renderCartItem();

    await user.click(screen.getByText("Update"));
    const quantityInput = screen.getByRole("textbox");
    await user.clear(quantityInput);
    await user.type(quantityInput, "5");
    await user.click(screen.getByText("Update"));

    expect(axios.put).toHaveBeenCalledWith(
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      { quantity: 5 }
    );
    expect(loadCart).toHaveBeenCalled();
  });

  it("deletes the cart item", async () => {
    renderCartItem();

    await user.click(screen.getByText("Delete"));

    expect(axios.delete).toHaveBeenCalledWith(
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(loadCart).toHaveBeenCalled();
  });
});
