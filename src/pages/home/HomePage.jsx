
import {Header} from '../../components/Header'
import axios from 'axios'
import { useSearchParams } from 'react-router'
import { useEffect ,useState } from 'react'
import './HomePage.css'
import{ProductsGrid} from './ProductsGrid'
export  function HomePage({cart ,  loadCart}){
  const [products,setProducts]=useState([])
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

  useEffect(()=>{ 
const FetchAppData= async()=>{
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data)
} 
FetchAppData()
  },[search])
  

 
    return(
        <>
         <title>Ecommerce Project</title>
    <Header cart={cart} />
    <div className="home-page">
     <ProductsGrid products={products}   loadCart={loadCart}/>
    </div>
  </>
    )
}