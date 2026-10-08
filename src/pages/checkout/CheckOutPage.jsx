
import {CheckOutHeader} from "./CheckOutHeader"
import './CheckOutPage.css'
import {formatMoney} from '../../ulits/money'
import axios from 'axios'
import dayjs from "dayjs"
import { useEffect ,useState } from 'react'
export function CheckOutPage({cart}){
  const [deliveryOptions,setDeliveryOptions]=useState([])
  const [paymentSummary, setPaymentSummary]=useState(null)

   useEffect(()=>{
  axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
  .then((response)=>setDeliveryOptions(response.data))

axios.get('/api/payment-summary')
.then((response)=>setPaymentSummary(response.data))

  },[])
return(
    <>
     <title>Checkout</title>

    <CheckOutHeader />

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">

          {deliveryOptions.length>0 && cart.map((Cartitem)=>{
            const selectedDeliveryOption=deliveryOptions.find(
              (deliveryOption)=>{
              return deliveryOption.id===Cartitem.deliveryOptionId
              }
            )
         return(
    <div key={Cartitem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={Cartitem.product.image}/>

              <div className="cart-item-details">
                <div className="product-name">
                  {Cartitem.product.name}
                </div>
                <div className="product-price">
               {formatMoney(Cartitem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{Cartitem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption)=>{
                  let priceShipping='free Shipping'
                  if(deliveryOption.priceCents>0){
                    priceShipping=`${formatMoney(deliveryOption.priceCents)} -shipping`
                  }
                      return(
 
                <div key={deliveryOption.id} className="delivery-option">
                  <input type="radio"
                  checked={deliveryOption.id===Cartitem.deliveryOptionId}
                    className="delivery-option-input"
                    name={`delivery-option-1 ${Cartitem.productId}`}
                    />
                  <div>
                    <div className="delivery-option-date">
                   {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd , MMMM D')}
                 
                    </div>
                    <div className="delivery-option-price">
                     {priceShipping}
                    </div>
                  </div>
                </div>
                      )
                }) }
            
              </div>
            </div>
          </div>
         )
          })}
    
        </div>

        <div className="payment-summary">
         
            <div className="payment-summary-title">
              Payment Summary
            </div>
{paymentSummary&&(
  <>
   <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">${formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
  
  </>
)

}
           
        </div>
      </div>
     </div>
    
    </>
)
}