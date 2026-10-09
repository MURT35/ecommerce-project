import { Routes , Route } from 'react-router'
import {HomePage} from './pages/home/HomePage'
import {CheckOutPage} from './pages/checkout/CheckOutPage'
import {OrdersPage} from './pages/orders/OrdersPage'
import {TrackingPage} from './pages/tracking/TrackingPage'
import axios from 'axios'
import { useEffect ,useState } from 'react'
import './App.css'
 

function App() {
  const [cart,setCart]=useState([])
const loadCart= async()=>{
const response = await axios.get("/api/cart-items?expand=product")
  setCart(response.data)
    }
  useEffect(()=>{
    
    loadCart()


  },[])

  return (

    <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path='checkout' element={<CheckOutPage  cart={cart}  loadCart={loadCart} />} />
        <Route path='orders' element={<OrdersPage cart={cart} />} />
         <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      </Routes> 
 
  )
}

export default App
