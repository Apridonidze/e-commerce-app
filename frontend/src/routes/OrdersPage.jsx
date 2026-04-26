import axios from "axios";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate, useParams } from "react-router-dom"; //importing react lbiraries

import { useEffect, useState, useContext } from "react"; //iumporting react hooks
import { UserContext } from "../context/UserContext"; //importing user context

import { BACKEND_URL } from "../../config"; //importing backend url from conmfig file

import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar"
import Footer from "../layout/Footer";
import AdminOrder from "../admin/components/orders/AdminOrder";
import EmptyAdminOrders from "../empty/EmptyAdminOrders"; //importing react components
import StatusMessage from "../alerts/StatusMessage";
import RowSkeleton from "../skeletons/RowSkeleton";

const OrdersPage = () => {

    const params = useParams(); //defining route params
    const navigator = useNavigate(); //initializing pages navigator
    
    const { user } = useContext(UserContext); //definig user context
    const [ cookies ] = useCookies(['token']); //definig user cookies
    
    const config = { headers : {Authorization : `Bearer ${cookies.token}`}}; //header content for api calls
    const allowedParams = ["Pending", "OnWay", "Delivered"]; //array of valid params user join with 

    const [isLoading , setIsLoading] = useState(true); //state to toggle loading skeleton
    const [offset, setOffset] = useState(0); //offset for orders
    const [orders,setOrders] = useState([]); //state to store orers

    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    useEffect(() => {

        if(!allowedParams.includes(params?.orderStatus) && user?.role !== 'admin'){ ///checking if user uses one of the allowedParams and is admin
            return navigator('/*', {replace : true});
        };//user who uses invalid params and is not admin is redirected to not found page

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/${params?.orderStatus}/${offset}`, config)
                
                if(response.status == 204) setOrders([]);
                setOrders(response.data.orders);
                setIsLoading(false);

            } catch (err) {
                setIsLoading(false)
                return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            }
        }

        fetchOrder()
    
    },[offset, params.orderStatus])

    const handleStatusChange = async(id, status) => {

        if(!allowedParams.includes(status)) return null;

        try{

            const response = await axios.put(`${BACKEND_URL}/api/dashboard/${id}` , {status}, config)
            
            setOrders(prevOrders => prevOrders?.map(ord => ord.order_id === id ? { ...ord, status: response.data.status } : ord))
            setToggleAlert({status: true, type: "Success", statusCode: response.status, message: response.data.message})

        }catch(err){
            if(err.status === 400) return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            if(err.status === 404)return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }


    const removeOrder = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/admin-remove/${id}` , config)

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
            
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <Header />
                        
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">

                            <div className="order-page-header-start"><button className="return d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() => {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button></div>
                            
                            <div className="order-page-header-end d-flex gap-2 align-items-center">
                                <NavLink to='/admin-dashboard/orders/Pending' className={({ isActive }) => isActive ? "active-order" : ""}>Pending</NavLink>
                                <NavLink to='/admin-dashboard/orders/OnWay' className={({ isActive }) => isActive ? "active-order" : ""}>OnWay</NavLink>
                                <NavLink to='/admin-dashboard/orders/Delivered' className={({ isActive }) => isActive ? "active-order" : ""}>Delivered</NavLink>
                            </div>

                        </div>
                    
                    </div>


                    <div className="orders-page-main rounded-3 mt-4 py-2">

                        <div className="orders-page-main-text p-3 rounded-3">
                            <h3>Recent Orders</h3>
                        </div>
                        
                        <div className="order-page-placeholder p-3">
                            <div className="order-page-placeholder-start">
                                <span>order id & <br /> date</span>
                                <span>user name & <br /> email</span>
                            </div>

                            <div className="order-page-placeholder-end">
                                <span>status & <br /> total price</span>
                                <span>actions</span>
                            </div>
                        </div>

                        {!isLoading ? orders?.length > 0 ? orders?.map(order => (
                            <AdminOrder order={order} allowedParams={allowedParams} handleStatusChange={handleStatusChange} removeOrder={removeOrder}/>
                        )) : <EmptyAdminOrders status={params.orderStatus}/> : <RowSkeleton />}
                    </div>

                    {orders?.length % 5 === 0 || orders?.length === 0 ? <></> : 
                        <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(orders.length % 5 === 0){return prev + 5} return prev})}>Load More Orders...</button>
                    }

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OrdersPage; //exporting component