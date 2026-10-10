import './orders.css'
import { OrderHeader } from './orderHeader'
import axios from 'axios'
import {OrderDetailsgrid} from  './orderDetailsGrid'
import { useEffect ,useState ,Fragment } from 'react'
import {Header} from '../../components/Header'
export function OrdersPage({cart , loadCart}){
const [orders,setOrders]=useState([])

  useEffect(()=>{ 
const FetchAppData= async()=>{
const response=await axios.get('/api/orders?expand=products')
  setOrders(response.data)
} 
FetchAppData()
  },[])
  
    return(
        <>
     
<Header cart={cart} />
    <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <div className="orders-grid">

        { orders.map((order)=>{
             
             return(
        <div key={order.id} className="order-container">
      
        <OrderHeader order={order}/> 
        < OrderDetailsgrid   order={order} loadCart={loadCart} />
         
        </div>

             )
        })

        }
  
      </div>
    </div>
        
        </>
    )
}