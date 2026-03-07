import axios from "axios"
import { useCookies } from "react-cookie"

import { BACKEND_URL } from "../../config"

const OrderCheckbox = ({ prod, prodId, key, setCart, cart }) => {

    const [cookies] = useCookies(['token'])

    const handleDeleteFromCart = async(e) => {
        try{

            await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setCart()})
            setCart(cart.filter(c => c.product_id !== prod.product_id))
            
        }catch(err){

            return
        }
    }
    return(
        <div className="order-checkbox-container">
            <div className="checkbox-start">
                <div className="">
                    <input type="checkbox" />
                    {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
                </div>
                <div className="row"></div>
            </div>
            <div className="checkbox-end">
                <img src='' alt="delete-icon" onClick={() => {handleDeleteFromCart(prod?.products_id)}}/> {/* add image */}
            </div>
        </div>
    )
}

export default OrderCheckbox