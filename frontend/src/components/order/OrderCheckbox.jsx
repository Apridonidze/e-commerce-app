import axios from "axios"
import { useCookies } from "react-cookie"

import { BACKEND_URL } from "../../../config"

const OrderCheckbox = ({ prod, prodId, key, setCart, cart, handleCheckbox, checkboxRef }) => {

    const [cookies] = useCookies(['token'])

    const handleDeleteFromCart = async(e) => {
        try{

            await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp)})
            setCart(cart.filter(c => c.product_id !== prod.product_id))
            
        }catch(err){

            return
        }
    }
    return(
        <div className="order-checkbox-container d-flex justify-content-between">

            <div className="checkbox-start d-flex justify-content-between">
                <div className="d">
                    <input type="checkbox" id={prod?.product_id} onChange={(e) => handleCheckbox(e, Number(prod?.amount) , Number(prod?.price))} ref={(e) => (checkboxRef.current[prod?.product_id] = e)}/>
                    {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
                </div>
                <div className="d">
                    <h3>{prod?.title}</h3>
                    <small>{prod.description?.length < 40 ? `${prod?.description.slice(0,40)}...` : prod?.description}</small>
                </div>
                <div className="d">
                    <h3>{prod?.amount} Pieces In Cart</h3>
                    <small>{prod?.price * prod?.amount}GEL</small>
                </div>
            </div>

            <div className="checkbox-end">
                <img src='' alt="delete-icon" onClick={() => {handleDeleteFromCart(prod?.products_id)}}/> {/* add image */}
            </div>

        </div>
    )
}

export default OrderCheckbox