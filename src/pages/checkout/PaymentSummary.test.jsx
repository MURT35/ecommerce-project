import { it , vi , expect,describe,beforeEach} from "vitest";
import { render  , screen,within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import {Paymentsummary} from './PaymentSummary'
import axios from "axios";
vi.mock('axios')

describe('PaymentSummary component',()=>{
 
    let paymentSummary
    let loadCart
    beforeEach(()=>{
vi.clearAllMocks()
paymentSummary={
    "totalItems":3,
    "productCostCents":4275,
    "shippingCostCents":499,
    "totalCostBeforeTaxCents":4774,
    "taxCents":477,
    "totalCostCents":5251}
loadCart=vi.fn()
        
    })

    it('display the payment summary',async()=>{
    render(
<MemoryRouter>
    <Paymentsummary paymentSummary={paymentSummary} loadCart={loadCart}/>
</MemoryRouter>
    )

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$42.75')
    ).toBeInTheDocument();

  
    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$47.74');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$4.77');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$52.51');
    })

    it('places an order', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter initialEntries={['/checkout']}>
          <Routes>
            <Route
              path="/checkout"
              element={
                <Paymentsummary paymentSummary={paymentSummary} loadCart={loadCart} />
              }
            />
            <Route path="/orders" element={<div>Your Orders</div>} />
          </Routes>
        </MemoryRouter>
      )

      await user.click(screen.getByRole('button', { name: 'Place your order' }))

      expect(axios.post).toHaveBeenCalledWith('/api/orders')
      expect(loadCart).toHaveBeenCalled()
      expect(screen.getByText('Your Orders')).toBeInTheDocument()
    })
})