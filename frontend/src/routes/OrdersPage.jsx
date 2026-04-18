import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import AdminOrder from "../admin/components/orders/AdminOrder";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const OrdersPage = () => {

    const params = useParams()
    
    const [cookies] = useCookies(['token'])
    const { user } = useContext(UserContext)

    const [offset, setOffset] = useState(0);
    const [orders,setOrders] = useState([])

    const navigator = useNavigate();

    const allowedParams = ["Pending", "OnWay", "Delivered"]


    useEffect(() => {

        if(!allowedParams.includes(params?.orderStatus) && user?.role !== 'admin'){
            navigator('/*', {replace : true})
            return;
        }


        const fetchOrder = async () => {
            
            try {
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/${params?.orderStatus}/${offset}`,{ headers: { Authorization: `Bearer ${cookies.token}` } })
                setOrders(response.data.orders)

            } catch (err) {
                console.log(err)
            }
        }

        fetchOrder()
    
    },[offset, params.orderStatus])

    return(

        <div className="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>
            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <Header />
                        <button onClick={() => {navigator('/admin-dashboard', {replace : true})}}>PrevUrl</button>
                    
                    </div>


                    {orders?.length !== 0 ? orders?.map(order => (
                        <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                    )) : `no items`}

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default OrdersPage