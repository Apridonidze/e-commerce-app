import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import AdminOrder from "../admin/components/orders/AdminOrder";

const OrdersPage = () => {

    const params = useParams()
    
    const [cookies] = useCookies(['token'])
    const { user } = useContext(UserContext)

    const [offset, setOffset] = useState(0);
    const [orders,setOrders] = useState([])

    const navigator = useNavigate();

    const allowedParams = ["pending", "onway", "delivered"]

    useEffect(() => {

        if(!allowedParams.includes(params?.orderStatus) || user?.role !== 'admin'){
            navigator('/*', {replace : true})
            return;
        }
        
        const fetchOrder = async () => {
            
            try {
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/${formattedStatus}/${offset}`,{ headers: { Authorization: `Bearer ${cookies.token}` } })
                setOrders(response.data.orders)

            } catch (err) {
                console.log(err)
            }
        }

        fetchOrder()
    
    },[offset, params.orderStatus])

    return(

        <div className="pending-orders-container d-flex">
            <Sidebar />
            <div className="main-container">
                <div className="prevbtn">
                    <button onClick={() => {navigator('/admin-dashboard', {replace : true})}}>PrevUrl</button>
                    {orders?.length !== 0 ? orders?.map(order => (
                        <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                    )) : `no order items`}
                </div>
            </div>
        </div>
    )
}

export default OrdersPage