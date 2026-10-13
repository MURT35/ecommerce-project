import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { OrderSummary } from "./OrderSummary";

describe("OrderSummary component", () => {
  let cart;
  let deliveryOptions;
  let loadCart;
  const deliveryTimeMs = 1723716000000;

  beforeEach(() => {
    loadCart = vi.fn();
    deliveryOptions = [
      { id: "1", priceCents: 0, estimatedDeliveryTimeMs: deliveryTimeMs },
      { id: "2", priceCents: 499, estimatedDeliveryTimeMs: deliveryTimeMs },
    ];
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
        product: {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          priceCents: 1090,
        },
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        product: {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          priceCents: 2095,
        },
      },
    ];
  });

  it("displays the cart products", () => {
    render(
      <OrderSummary
        cart={cart}
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    );

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("Intermediate Size Basketball")).toBeInTheDocument();
    expect(screen.getByText("10.90")).toBeInTheDocument();
    expect(screen.getByText("20.95")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        `Delivery date: ${dayjs(deliveryTimeMs).format("dddd, MMMM D")}`
      )
    ).toHaveLength(2);
    expect(screen.getAllByText("Update")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
    expect(screen.getAllByText("free Shipping")).toHaveLength(2);
  });
});
