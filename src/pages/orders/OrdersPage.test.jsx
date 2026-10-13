import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { OrdersPage } from "./OrdersPage";

vi.mock("axios");

describe("OrdersPage component", () => {
  const socksId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const basketballId = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockImplementation(async (url) => {
      if (url === "/api/orders?expand=products") {
        return {
          data: [
            {
              id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
              orderTimeMs: 1723456800000,
              totalCostCents: 3506,
              products: [
                {
                  productId: socksId,
                  quantity: 1,
                  estimatedDeliveryTimeMs: 1723716000000,
                  product: {
                    id: socksId,
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                  },
                },
              ],
            },
            {
              id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
              orderTimeMs: 1718013600000,
              totalCostCents: 4190,
              products: [
                {
                  productId: basketballId,
                  quantity: 2,
                  estimatedDeliveryTimeMs: 1718618400000,
                  product: {
                    id: basketballId,
                    name: "Intermediate Size Basketball",
                    image: "images/products/intermediate-composite-basketball.jpg",
                  },
                },
              ],
            },
          ],
        };
      }
      return { data: [] };
    });
  });

  it("displays the ordered products", async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} loadCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(await screen.findByText("Your Orders")).toBeInTheDocument();
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("Intermediate Size Basketball")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getAllByText("Add to Cart")).toHaveLength(2);
    expect(screen.getAllByText("Track package")).toHaveLength(2);
    expect(screen.getByText("27cba69d-4c3d-4098-b42d-ac7fa62b7664")).toBeInTheDocument();
    expect(screen.getByText("b6b6c212-d30e-4d4a-805d-90b52ce6b37d")).toBeInTheDocument();
  });
});
