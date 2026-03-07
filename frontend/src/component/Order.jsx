import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import OrderCheckbox from "./OrderCheckbox"
import { useState } from "react"

const Order = ({ setCart, cart }) => {

    const [cookies] = useCookies(['token'])
    const [selectedItems, setSelectedItems] = useState([])

    const orderItems = async() => {
        try{

            const order = await axios.post(`${BACKEND_URL}/api/order` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(order)

        }catch(err){
            console.log(err)
        }
    }

    // create function handleSelect and pass down to each OrderCheckbox.jsx compoennt to define ids of selected products and amounts for orders.
 
    return(
        <div className="order-container bg-white position-relative" style={{right : '25vw', bottom : '25vw'}}>
            <h1>Choose Items to be delivered</h1>
            {/* display total price of order */}
            {/* display total amount of ordered items pieces */}
            {cart?.map((prod,prodId) => (
                <OrderCheckbox prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} />
            ))}
        </div>
    )
}
// disable button if items overall price is lower than 40 gel

export default Order