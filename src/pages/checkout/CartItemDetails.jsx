
import dayjs from "dayjs"
import {formatMoney} from '../../ulits/money'
export function CartItem( {Cartitem , selectedDeliveryOption} ){
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
            </div>
        
        </>
    )
}