import axios from "axios"
import { useEffect, useState} from "react"

import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Product from "./Product"
import Item from "./Item"
const DashboardCart = ({  }) => {

    const [cookies] = useCookies(['token'])
    
    const [cart , setCart] = useState([])

    useEffect(() => {
        const fetchCartItems = async() => {
            try{
                // refactor
                await axios.get(`${BACKEND_URL}/cart` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setCart(resp.data.products)})
            }catch(err){
                console.log(err)
            }
        }

        return () => {fetchCartItems()};

    },[])

    const orderItems = async() => {
        try{

            

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

export default DashboardCart