import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import OrderCheckbox from "./OrderCheckbox"
import { useEffect, useState } from "react"

const Order = ({ setCart, cart }) => {

    const [cookies] = useCookies(['token'])
    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const orderItems = async() => {
        try{

            const order = await axios.post(`${BACKEND_URL}/api/order` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(order)

        }catch(err){
            console.log(err)
        }
    }

    const handleSelectAll = (e) => {

        const checked = e.target.checked

        if(checked && cart.length !== 0){
            let items = cart.map((cart, _) => (cart.price * cart.amount))
            let total = items.reduce((sum, item) => sum + item, 0);
            setTotalPrice(total)
        }

        else {
            return setTotalPrice(0)
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

    useEffect(() => {


        let total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total)
        
    },[selectedItems])

 
    return(
        <div className="order-container bg-white position-relative" style={{right : '25vw', bottom : '25vw'}}>
            
            <div className="order-top">
                <div className="top-start">
                    <h3>Choose Products To Be Ordered</h3>
                </div>

                <div className="top-end d-flex">
                    <h4>Total Price : {totalPrice}</h4>

                    <label htmlFor="selectAll">Select All ({cart.length})</label>
                    <input type="checkbox" id="selectAll" name="selectAll" onChange={(e) => handleSelectAll(e)}/>
                </div>

            </div>
            {cart?.map((prod,prodId) => (
                <OrderCheckbox prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} handleCheckbox={handleCheckbox} />
            ))}
        </div>
    )
}
// disable button if items overall price is lower than 40 gel

export default Order