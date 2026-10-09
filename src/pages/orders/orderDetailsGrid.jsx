
import dayjs from "dayjs"
import { Fragment } from 'react'
export function OrderDetailsgrid({order}){
    return(
     <div className="order-details-grid">
{order.products.map((Orderproduct)=>{
              return(
                <Fragment  key={Orderproduct.product.id} >
                   <div  className="product-image-container">
              <img src={Orderproduct.product.image}/>
            </div>
                      <div className="product-details">
              <div className="product-name">
               {Orderproduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(Orderproduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {Orderproduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${Orderproduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
                
                </Fragment>
              )
            })}
            
    
          </div>
    )
}