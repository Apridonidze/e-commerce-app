import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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


    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered'];

    const handleStatusChange = async(id, status) => {
        try{

            const response = await axios.put(`${BACKEND_URL}/api/dashboard/${id}` , {status}, {headers : {Authorization : `Bearer ${cookies.token}`}})
            if(response.status === 200){
                setOrders(prevOrders => prevOrders?.map(ord => ord.order_id === id ? { ...ord, status: response.data.status } : ord))
            }

        }catch(err){
            if(err.status === 400) return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            if(err.status === 404)return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }


    const removeOrder = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/admin-remove/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200)return setOrders(prev => prev.filter(ord => ord.order_id !== id))
            setToggleDrop(false)

        }catch(err){
            if(err.status === 400) return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            if(err.status === 404)return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }

    return(

        <div className="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>
            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <Header />
                        
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">

                            <div className="order-page-header-start"><button className="d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() => {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button></div>
                            
                            <div className="order-page-header-end d-flex gap-2 align-items-center">
                                <NavLink to='/admin-dashboard/orders/Pending' className={({ isActive }) => isActive ? "active-order" : ""}>Pending</NavLink>
                                <NavLink to='/admin-dashboard/orders/OnWay' className={({ isActive }) => isActive ? "active-order" : ""}>OnWay</NavLink>
                                <NavLink to='/admin-dashboard/orders/Delivered' className={({ isActive }) => isActive ? "active-order" : ""}>Delivered</NavLink>
                            </div>

                        </div>
                    
                    </div>


                    {orders?.length !== 0 ? orders?.map(order => (
                        <AdminOrder order={order} setOrders={setOrders} orderStatuses={orderStatuses} handleStatusChange={handleStatusChange} removeOrder={removeOrder}/>
                    )) : `no items`}

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default OrdersPage