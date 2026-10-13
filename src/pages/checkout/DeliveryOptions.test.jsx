import { it, vi, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions";

vi.mock("axios");

describe("DeliveryOptions component", () => {
  let cartItem;
  let deliveryOptions;
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
    };
    deliveryOptions = [
      { id: "1", priceCents: 0, estimatedDeliveryTimeMs: deliveryTimeMs },
      {
        id: "2",
        priceCents: 499,
        estimatedDeliveryTimeMs: deliveryTimeMs + 86400000,
      },
      {
        id: "3",
        priceCents: 999,
        estimatedDeliveryTimeMs: deliveryTimeMs + 172800000,
      },
    ];
  });

  function renderDeliveryOptions() {
    render(
      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        Cartitem={cartItem}
        loadCart={loadCart}
      />
    );
  }

  it("displays the delivery options", () => {
    renderDeliveryOptions();

    expect(screen.getByText("Choose a delivery option:")).toBeInTheDocument();
    expect(screen.getByText("free Shipping")).toBeInTheDocument();
    expect(screen.getByText("4.99 -shipping")).toBeInTheDocument();
    expect(screen.getByText("9.99 -shipping")).toBeInTheDocument();
    expect(
      screen.getByText(dayjs(deliveryTimeMs).format("dddd , MMMM D"))
    ).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it("updates the delivery option", async () => {
    renderDeliveryOptions();

    await user.click(screen.getByText("4.99 -shipping"));

    expect(axios.put).toHaveBeenCalledWith(
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      { deliveryOptionId: "2" }
    );
    expect(loadCart).toHaveBeenCalled();
  });
});
