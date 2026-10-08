
import {CheckOutHeader} from "./CheckOutHeader"
import './CheckOutPage.css'
import axios from 'axios'
import {OrderSummary} from './OrderSummary'
import { useEffect ,useState } from 'react'
import {Paymentsummary} from './PaymentSummary'

export function CheckOutPage({cart}){
  const [deliveryOptions,setDeliveryOptions]=useState([])
  const [paymentSummary, setPaymentSummary]=useState(null)


  useEffect(()=>{ 
const FetchAppData= async()=>{
let response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
 setDeliveryOptions (response.data)
response=await axios.get('/api/payment-summary')
setPaymentSummary(response.data)
} 

FetchAppData()

  },[])


return(
    <>
     <title>Checkout</title>

    <CheckOutHeader />

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
  
       <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
    
       < Paymentsummary paymentSummary={paymentSummary} />

       
      </div>
     </div>
    
    </>
)
}