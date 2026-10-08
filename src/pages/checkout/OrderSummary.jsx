
import {CartItem} from './CartItemDetails'
import {DeliveryOptions} from './DeliveryOptions'
export  function OrderSummary({cart,deliveryOptions}){
    return(
  <div className="order-summary">

          {deliveryOptions.length>0 && cart.map((Cartitem)=>{
            const selectedDeliveryOption=deliveryOptions.find(
              (deliveryOption)=>{
              return deliveryOption.id===Cartitem.deliveryOptionId
              }
            )
         return(
    <div key={Cartitem.productId} className="cart-item-container">
           <CartItem  Cartitem={Cartitem}  selectedDeliveryOption={selectedDeliveryOption} />
       <DeliveryOptions deliveryOptions={deliveryOptions}  Cartitem={Cartitem}/>
          </div>
         )
          })} 
            
    
        </div>
    )
   
}