import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const OrderList = () => {

    const [cookies] = useCookies(['token'])

    const [orders,setOrders] = useState([])

    useEffect(() => {

        const fetchOrders = async() => {

            try{

                const orders = await axios.get(`${BACKEND_URL}/api/order`, {headers : {Authorization : `Bearer ${cookies.token}`}})

                if(orders.status === 204) setOrders([])
                
                setOrders(orders.data.orders)

            }catch(err){
                console.log(err)
            }

        }

        return () => fetchOrders()

    },[])

    return(
        <div className="order-list-container">
            My Orders
            {orders?.map((order,orderId) => (
                <>
                    <h1>Order Status : {order.status}</h1>
                    <h3>Ordered At: {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</h3>
                    <h3>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h3>
                </>
            ))}
        </div>
    )
}

export default OrderList