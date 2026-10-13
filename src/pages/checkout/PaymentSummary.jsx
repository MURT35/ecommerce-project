
import {formatMoney} from '../../ulits/money'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router'
export function Paymentsummary({paymentSummary , loadCart }){
  const navigate=useNavigate()
  const createOrder= async()=>{
    await axios.post('/api/orders')
    await loadCart()
    navigate('/orders')
  }
    return(
         <div className="payment-summary">
         
            <div className="payment-summary-title">
              Payment Summary
            </div>
{paymentSummary&&(
  <>
   <div className="payment-summary-row" data-testId="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money" 
              data-testId="payment-summary-product-cost"
              >${formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row" 
             data-testId='payment-summary-shipping-cost'>
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money"
              
              >${formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money"
              data-testId='payment-summary-total-before-tax'
              >${formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money"
               data-testId='payment-summary-tax' >${formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money"
               data-testId='payment-summary-total'
              >${formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary"
            onClick={createOrder}
            >
              Place your order
            </button>
  
  </>
)

}
           
        </div>
    )
}