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

    const handleCheckbox = (e, amount, price) => {

        const id = e.target.id
        const checked = e.target.checked;

        if (checked) {
            setSelectedItems((prev) => [...prev, {id , amount, price : price * amount}]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item.id !== id));
        }

    }



    //add useeffect function that has seletceditems variable as dependencie and display total price, total units of products and based on it display order button
 
    return(
        <div className="order-container bg-white position-relative" style={{right : '25vw', bottom : '25vw'}}>
            <h1>Choose Items to be delivered</h1>
            {/* display total price of order */}
            {/* display total amount of ordered items pieces */}
            {cart?.map((prod,prodId) => (
                <OrderCheckbox prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} handleCheckbox={handleCheckbox}/>
            ))}
        </div>
    )
}
// disable button if items overall price is lower than 40 gel

export default Order