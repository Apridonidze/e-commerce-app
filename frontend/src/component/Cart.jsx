import axios from "axios"
import { useEffect, useState} from "react"

import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Product from "./Product"
const DashboardCart = () => {

    const [cookies] = useCookies(['token'])
    
    const [cart , setCart] = useState([])

    useEffect(() => {
        const fetchCartItems = async() => {
            try{
                await axios.get(`${BACKEND_URL}/cart` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setCart(resp.data.products)})
            }catch(err){
                console.log(err)
            }
        }

        return () => {fetchCartItems()};

    },[])

    return(
        <>
            <div className="dasboard-start">
                <h3>Cart</h3>
            </div>
            <div className="dasboard-center">
                {cart.map((prod , prodId) => (
                    
                    <Product prod={prod} prodId={prodId} key={prodId}/>
                ))}
            </div>
            <div className="dasboard-end">
                
            </div>
        </>
    )
}

export default DashboardCart