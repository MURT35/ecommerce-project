import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import dayjs from "dayjs";
import axios from "axios";
import { CheckOutPage } from "./CheckOutPage";

vi.mock("axios");

describe("CheckOutPage component", () => {
  let cart;
  let loadCart;
  const deliveryTimeMs = 1723716000000;

  beforeEach(() => {
    vi.clearAllMocks();
    loadCart = vi.fn();
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
    ];

    axios.get.mockImplementation(async (url) => {
      if (url === "/api/delivery-options?expand=estimatedDeliveryTime") {
        return {
          data: [
            { id: "1", priceCents: 0, estimatedDeliveryTimeMs: deliveryTimeMs },
            { id: "2", priceCents: 499, estimatedDeliveryTimeMs: deliveryTimeMs },
          ],
        };
      }
      if (url === "/api/payment-summary") {
        return {
          data: {
            totalItems: 2,
            productCostCents: 2180,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 2180,
            taxCents: 218,
            totalCostCents: 2398,
          },
        };
      }
      return { data: [] };
    });
  });

  it("displays the cart product and payment summary", async () => {
    render(
      <MemoryRouter>
        <CheckOutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(await screen.findByText("Review your order")).toBeInTheDocument();
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Delivery date: ${dayjs(deliveryTimeMs).format("dddd, MMMM D")}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("10.90")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2 item" })).toBeInTheDocument();
    expect(screen.getByText("Items (2):")).toBeInTheDocument();
    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent("$23.98");
    expect(
      screen.getByRole("button", { name: "Place your order" })
    ).toBeInTheDocument();
  });
});
