import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const OrderList = () => {

    const [cookies] = useCookies(['token'])


    useEffect(() => {

        const fetchOrders = async() => {

            try{

                const orders = await axios.get(`${BACKEND_URL}/api/order`, {headers : {Authorization : `Bearer ${cookies.token}`}})

                console.log(orders)

            }catch(err){
                console.log(err)
            }

        }

        return () => fetchOrders()

    },[])

    return(
        <div className="order-list-container">
            My Orders
        </div>
    )
}

export default OrderList