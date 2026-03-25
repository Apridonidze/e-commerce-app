import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import OrderDetails from "./OrderDetails"

const OrderList = () => {

    const [cookies] = useCookies(['token'])

    const [orders,setOrders] = useState([])

    useEffect(() => {

        const fetchOrders = async() => {

            try{

                const orders = await axios.get(`${BACKEND_URL}/api/order`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                
                if(orders.status === 204) setOrders([])
                
                    console.log(orders)
                if(orders.status === 200){
                    setOrders(orders.data.orders)
                }

            }catch(err){
                console.log(err)
            }

        }

        return () => fetchOrders()

    },[])
    console.log(orders)
    return(
        <div className="order-list-container">
            <h3>My Orders</h3>
            {orders?.length > 0 ? orders?.filter((order) => order.status !== "Delivered").map((order,orderId) => (
                <OrderDetails order={order} orderId={orderId} key={orderId} setOrders={setOrders}/>
            )) : "No Items Ordered"}

            <h3>Delivered Orders</h3>
            {orders?.filter((order) => order.status == "Delivered")?.length > 1 ? orders?.filter((order) => order.status == "Delivered").map((order,orderId) => (
                <OrderDetails order={order} orderId={orderId} key={orderId} setOrders={setOrders}/>
            )) : "No Delivered Orders"}
        </div>
    )
}

export default OrderList