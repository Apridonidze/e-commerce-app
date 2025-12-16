import axios from "axios"
import { useEffect, useState} from "react"

import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
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
                {cart.length < 1 ? <h1>No Items In Cart Yet.</h1> : cart?.map((item,itemId) => (
                    <span key={itemId}>{item}</span>
                ))}
            </div>
            <div className="dasboard-end">
                
            </div>
        </>
    )
}

export default DashboardCart