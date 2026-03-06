import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"
import axios from "axios"

const Order = ({ cart }) => {

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
        <div className="order-container">
            <h1>Choose Items to be delivered</h1>
            {/* display cart items with checkboxes */}
            {/* once the order price is higher than 40gel make order button avaliable else disable it */}
            {/* for avalaible button trigger orderItems function */}
            {/* add alerts messages  */}
        </div>
    )
}

export default Order