
import { NavLink , useNavigate , useSearchParams } from 'react-router'
import { useState } from 'react'
import './header.css'
export function Header({cart = []}){
   
  const navigate=useNavigate()
  const [searchParams]=useSearchParams()
  const searchText=searchParams.get('search')
 const[searchValue,setSearchValue]=useState(searchText || '')
  const hanldeSearchChange= (event)=>{
    setSearchValue(event.target.value)
  }
  const hanldeSearchClick=()=>{
    console.log(searchValue)
    navigate(`/?search=${searchValue}`)
   
  }
  let Totalquantity=0
  cart.forEach((Cartitem)=>{
    Totalquantity += Cartitem.quantity
  })
    return(
        <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link"> 
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={searchValue} onChange={hanldeSearchChange}  />

        <button className="search-button" onClick={hanldeSearchClick}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{Totalquantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>

    )
}