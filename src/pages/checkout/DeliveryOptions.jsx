import dayjs from "dayjs"
import {formatMoney} from '../../ulits/money'
import  axios  from "axios"
export function DeliveryOptions({deliveryOptions , Cartitem , loadCart}){
return(
    <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption)=>{
                  let priceShipping='free Shipping'
                  if(deliveryOption.priceCents>0){
                    priceShipping=`${formatMoney(deliveryOption.priceCents)} -shipping`
                  }

                  const updateDeliveryOption= async ()=>{
                   await axios.put(`/api/cart-items/${Cartitem.productId}`,{
                      deliveryOptionId:deliveryOption.id
                    })
                   await loadCart()
                  }
                      return(
 
                <div key={deliveryOption.id} className="delivery-option"
                onClick={updateDeliveryOption}
                >
                  <input type="radio"
                  checked={deliveryOption.id===Cartitem.deliveryOptionId}
                  onChange={()=>{}}
                    className="delivery-option-input"
                    name={`delivery-option-1 ${Cartitem.productId}`}
                    />
                  <div>
                    <div className="delivery-option-date">
                   {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd , MMMM D')}
                 
                    </div>
                    <div className="delivery-option-price">
                     {priceShipping}
                    </div>
                  </div>
                </div>
                      )
                }) }
            
              </div>
)

}