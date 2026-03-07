import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import OrderCheckbox from "./OrderCheckbox"

const Order = ({ setCart, cart }) => {

    const [cookies] = useCookies(['token'])

    const orderItems = async() => {
        try{

            const order = await axios.post(`${BACKEND_URL}/api/order` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(order)

        }catch(err){
            console.log(err)
        }
    }
 
    return(
        <div className="order-container bg-white position-relative" style={{right : '25vw', bottom : '25vw'}}>
            <h1>Choose Items to be delivered</h1>
            {cart?.map((prod,prodId) => (
                <OrderCheckbox prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart}/>
            ))}
        </div>
    )
}
// add order items button and add orderItems function to it
// add price and amount of total items
// disable button if items overall price is lower than 40 gel

export default Order