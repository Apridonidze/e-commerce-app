import axios from "axios"
import { useCookies } from "react-cookie"

import { useEffect } from "react"
import { BACKEND_URL } from "../../config"

import Item from "./Item"

const Cart = ({ setToggleAlert, setToggleOrder, setCart, cart }) => {

    const [cookies] = useCookies(['token'])

    useEffect(() => {

        const fetchCartItems = async() => {
            try{

                const cartItems = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                
                if(cartItems.status === 204)return setCart([]);

                setCart(cartItems.data.cartItems)

            }catch(err){
                setCart([])
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
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
                {/* display only first 5 cart items */}
            </div>
            <div className="cart-end">
                {cart.length === 0 ? <button disabled>Order Items</button> : <button onClick={() => setToggleOrder(true)}>Order Items</button>}
            </div>
        </div >
    )
}

//TODO : create loading skeleton for compoentn

export default Cart