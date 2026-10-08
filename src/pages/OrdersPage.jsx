import './orders.css'
import {formatMoney} from '../ulits/money'
import axios from 'axios'
import dayjs from "dayjs"
import { useEffect ,useState ,Fragment } from 'react'
import {Header} from '../components/Header'
export function OrdersPage({cart}){
const [orders,setOrders]=useState([])
useEffect(()=>{
  axios.get('/api/orders?expand=products')
  .then((response)=>setOrders(response.data))
},[]
)

    return(
        <>
     
<Header cart={cart} />
    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">

        { orders.map((order)=>{
             
             return(
        <div key={order.id} className="order-container">
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>${formatMoney(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

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
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
                
                </Fragment>
              )
            })}
            
    
          </div>
        </div>

             )
        })

        }
  

        {/* <div className="order-container">

          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>June 10</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>$41.90</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
            </div>
          </div>

          <div className="order-details-grid">
            <div className="product-image-container">
              <img src="images/products/intermediate-composite-basketball.jpg" />
            </div>

            <div className="product-details">
              <div className="product-name">
                Intermediate Size Basketball
              </div>
              <div className="product-delivery-date">
                Arriving on: June 17
              </div>
              <div className="product-quantity">
                Quantity: 2
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
        
        </>
    )
}