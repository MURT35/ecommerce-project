
import './tracking.css'
import { Link } from 'react-router'
import {Header} from '../../components/Header'
import { useParams } from 'react-router'
import { useEffect ,useState } from 'react'
import axios from 'axios'
import dayjs from "dayjs"
import {formatMoney} from '../../ulits/money'

export function TrackingPage({cart}){
  
const { orderId, productId } = useParams()
const [order, setOrder] = useState(null)
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);
 if(!order){
  return null
 }
 const orderProduct=order.products.find((orderProduct)=>{
  return orderProduct.productId === productId
 })

const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
let deliveryPercent=(timePassedMs/totalDeliveryTimeMs)*100
if(deliveryPercent>100){
  deliveryPercent=100
}
const IsPreparing= deliveryPercent<33 
const IsShipped= deliveryPercent>=33
const IsDelivered= deliveryPercent===100

    return(
        <>
  <Header cart={cart} />

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          {deliveryPercent>=100?`Delivered On:${dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`
          :`Arriving On: ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`}
          
        </div>

        <div className="product-info">
         {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image}  />

        <div className="progress-labels-container">
          <div className={`progress-label ${IsPreparing&&'current-status'} `}>
            Preparing
          </div>
          <div className={`progress-label ${IsShipped&&'current-status'} `}>
            Shipped
          </div>
          <div className={`progress-label ${IsDelivered&&'current-status'} `}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
        </div>
      </div>
    </div>
        </>
    )
}