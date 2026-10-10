
import dayjs from "dayjs"
import {formatMoney} from '../../ulits/money'
import axios from "axios"
import { useState } from "react"
export function CartItem( {Cartitem , selectedDeliveryOption , loadCart} ){
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity,setQuantity]=useState(Cartitem.quantity)
const handleKey=(event)=>{
if(event.key === 'Enter'){
   updateQuantity()
}
else if(event.key==='Escape'){
setIsUpdatingQuantity(false),
setQuantity(Cartitem.quantity)
}
}
const handleChange=(event)=>{
  setQuantity(event.target.value)
}
  const deleteCartitem= async ()=>{
     await axios.delete(`/api/cart-items/${Cartitem.productId}`)
     await loadCart()
    }

  const updateQuantity = async()=>{
 if(isUpdatingQuantity){
   axios.put(`/api/cart-items/${Cartitem.productId}`,{
    quantity:Number(quantity)
   })
   loadCart()
  setIsUpdatingQuantity(false)
 }
 else{
    setIsUpdatingQuantity(true)
 }
  }



    return(
        <>
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
                    Quantity: 
                  {isUpdatingQuantity?<input type="text" className="update-text"  value={quantity} onKeyDown={handleKey} onChange={handleChange} />
                  :<span className="quantity-label">{Cartitem.quantity}</span>}
                    
                  </span>
                  <span className="update-quantity-link link-primary" 
                  onClick={updateQuantity}
                  >
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary" 
                  onClick={deleteCartitem}>
                    Delete
                  </span>
                </div>
              </div>
            </div>
        
        </>
    )
}