import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import axios from "axios";
import { OrderDetailsgrid } from "./orderDetailsGrid";

vi.mock("axios");

describe("OrderDetailsgrid component", () => {
  let order;
  let loadCart;
  let user;
  const socksId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const basketballId = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const socksDeliveryMs = 1723716000000;
  const basketballDeliveryMs = 1718618400000;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    loadCart = vi.fn();
    order = {
      id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      products: [
        {
          productId: socksId,
          quantity: 1,
          estimatedDeliveryTimeMs: socksDeliveryMs,
          product: {
            id: socksId,
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          },
        },
        {
          productId: basketballId,
          quantity: 2,
          estimatedDeliveryTimeMs: basketballDeliveryMs,
          product: {
            id: basketballId,
            name: "Intermediate Size Basketball",
            image: "images/products/intermediate-composite-basketball.jpg",
          },
        },
      ],
    };
  });

  function renderOrderDetails() {
    render(<OrderDetailsgrid order={order} loadCart={loadCart} />);
  }

  it("displays the ordered products", () => {
    renderOrderDetails();

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();
    expect(screen.getByText("Intermediate Size Basketball")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(
      screen.getByText(`Arriving on: ${dayjs(socksDeliveryMs).format("MMMM D")}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Arriving on: ${dayjs(basketballDeliveryMs).format("MMMM D")}`
      )
    ).toBeInTheDocument();

    const sources = screen.getAllByRole("img").map((img) => img.getAttribute("src"));
    expect(sources).toContain("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(sources).toContain("images/products/intermediate-composite-basketball.jpg");
  });

  it("adds a product to the cart", async () => {
    renderOrderDetails();

    await user.click(screen.getAllByText("Add to Cart")[0]);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: socksId,
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  it("links to the tracking page", () => {
    renderOrderDetails();

    const trackLinks = screen.getAllByText("Track package").map((button) => button.closest("a"));
    expect(trackLinks[0]).toHaveAttribute("href", `/tracking/${order.id}/${socksId}`);
    expect(trackLinks[1]).toHaveAttribute("href", `/tracking/${order.id}/${basketballId}`);
  });
});
