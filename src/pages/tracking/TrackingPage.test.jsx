import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import dayjs from "dayjs";
import axios from "axios";
import { TrackingPage } from "./TrackingPage";

vi.mock("axios");

describe("TrackingPage component", () => {
  const orderId = "27cba69d-4c3d-4098-b42d-ac7fa62b7664";
  const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  let orderTimeMs;
  let estimatedDeliveryTimeMs;
  let user;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    orderTimeMs = dayjs().subtract(1, "hour").valueOf();
    estimatedDeliveryTimeMs = dayjs().add(10, "day").valueOf();

    axios.get.mockImplementation(async (url) => {
      if (url === `/api/orders/${orderId}?expand=products`) {
        return {
          data: {
            id: orderId,
            orderTimeMs,
            totalCostCents: 3506,
            products: [
              {
                productId,
                quantity: 1,
                estimatedDeliveryTimeMs,
                product: {
                  id: productId,
                  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                },
              },
            ],
          },
        };
      }
      return { data: null };
    });
  });

  function renderTrackingPage() {
    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route
            path="/tracking/:orderId/:productId"
            element={<TrackingPage cart={[]} />}
          />
          <Route path="/orders" element={<div>Your Orders</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("displays the tracked product", async () => {
    renderTrackingPage();

    expect(
      await screen.findByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Arriving On: ${dayjs(estimatedDeliveryTimeMs).format("dddd, MMMM D")}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Preparing")).toHaveClass("current-status");
    expect(screen.getByText("Shipped")).not.toHaveClass("current-status");
    expect(screen.getByText("Delivered")).not.toHaveClass("current-status");

    const productImage = screen
      .getAllByRole("img")
      .find((img) => img.getAttribute("src") === "images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(productImage).toBeTruthy();
  });

  it("returns to orders when view all orders is clicked", async () => {
    renderTrackingPage();

    await screen.findByText("Black and Gray Athletic Cotton Socks - 6 Pairs");
    await user.click(screen.getByRole("link", { name: "View all orders" }));

    expect(screen.getByText("Your Orders")).toBeInTheDocument();
  });
});
