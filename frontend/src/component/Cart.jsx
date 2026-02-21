import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

import { useCookies } from "react-cookie"
import Item from "./Item"
import { useEffect } from "react"
const DashboardCart = ({  }) => {

    const [cookies] = useCookies(['token'])
    const [cart , setCart] = useState([])

    const { cartIds } = useContext(UserContext)
    
    useEffect(() => {setCart(cartIds)},[cartIds])
    
    const orderItems = async() => {
        try{

            //add api call to for ordering
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <div className="dasboard-start">
                <h3>Cart</h3>
            </div>
            <div className="dasboard-center">
                {cart ? cart.map((prod , prodId) => (
                    
                    <Item prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} />
                )) : 'loading'}
            </div>
            <div className="dasboard-end">
                <button onClick={orderItems}>Order Items</button>
            </div>
        </>
    )
}

//TODO : remove fetch cart items from here and import it from usercontext.jsx
//TODO : create loading skeleton for compoentn

export default DashboardCart