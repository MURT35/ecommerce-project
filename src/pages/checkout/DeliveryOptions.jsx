import dayjs from "dayjs"
import {formatMoney} from '../../ulits/money'
export function DeliveryOptions({deliveryOptions , Cartitem}){
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
                      return(
 
                <div key={deliveryOption.id} className="delivery-option">
                  <input type="radio"
                  checked={deliveryOption.id===Cartitem.deliveryOptionId}
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