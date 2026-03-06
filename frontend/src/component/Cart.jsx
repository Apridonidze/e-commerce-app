import { useState } from "react"

import { useCookies } from "react-cookie"
import Item from "./Item"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"


const Cart = ({ setToggleOrder }) => {

    const [cookies] = useCookies(['token'])
    const [cart , setCart] = useState([])
    
    useEffect(() => {

        const fetchCartItems = async() => {
            try{

                const cartItems = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                
                if(cartItems.status === 204)return setCart([]);

                setCart(cartItems.data.cartItems)

            }catch(err){
                // toggle error message
                setCart([])
                console.log(err)
            }
        }

        return () => fetchCartItems()

    },[])
    
    


    return(
        <div className="cart-container">
            <div className="cart-start">
                <h3>Cart</h3>
            </div>
            <div className="cart-center">
                {cart?.length !== 0 ? cart.map((prod , prodId) => (
                    
                    <Item prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} />
                )) : 'no cart items'}
            </div>
            <div className="cart-end">
                {cart.length === 0 ? <button disabled>Order Items</button> : <button onClick={() => setToggleOrder(true)}>Order Items</button>}
            </div>
        </div >
    )
}

//TODO : create loading skeleton for compoentn

export default Cart