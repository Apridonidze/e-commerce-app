import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom"; //importing react libraries

import OrderBox from "./OrderBox";
import EmptyOrders from "../../../empty/EmptyOrders"; //importing react componnets

import { BACKEND_URL } from "../../../../config"; //importing backend url from config file
import EmptyAdminOrders from "../../../empty/EmptyAdminOrders";
 
const ManageOrders = ({ orders, setOrders, setToggleAlert }) => { //importing props from parent component (AdminDashboard.jsx)

    const [ cookies ] = useCookies(['token']); //cookies
    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered']; //array of allowed order statuses

    const handleStatusChange = async(id, status) => {//api function that recieved id and status of order and changes status via api

        if(!orderStatuses.includes(status)) return;// returning empty promise if provided status is not in allowed array's list

        try{

            const response = await axios.put(`${BACKEND_URL}/api/dashboard/${id}` , {status}, {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call
            if(response.status === 200) setOrders(prevOrders => prevOrders?.map(ord => ord.order_id === id ? { ...ord, status: response.data.status } : ord)); //handlign 200 status code by instantly updating order in state

        }catch(err){ //catching errors
            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handligng 400 status code errror (if user injects invalid params)
            if(err.status === 404)return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handling 404 status code (if order is not found in database)
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});//handling other type of internal errors (500 status code eeeors)
        };
    };

    const removeOrder = async(id) => { //recieving id param
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/admin-remove/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}}); //m,making api call
            
            if(response.status === 200) return setOrders(prev => prev.filter(ord => ord.order_id !== id)); //handling 200 status code
            setToggleDrop(false); //untoggling select form

        }catch(err){
            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handling 400 status code (invalid_params)
            if(err.status === 404)return setToggleAlert({status: true, type: "Warning", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handling 404 status code (order not found)
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handlking other types of errors (internal errors)
        };
    };

    return (
        <div className="manage-orders-container mt-5 mx-2">

            <div className="manage-orders-header my-3"><h4><i className="fa-solid fa-box-open me-2" style={{color : "#10b981"}} ></i> Orders</h4></div>
            <div className="orders-container">

                {orderStatuses?.map((status => (    
                    <div className={`default-container ${status} p-2 rounded-3`}>
                        
                        <div className="manage-order-header d-flex justify-content-between mb-3 align-items-center">
                            <h3 className="d-flex mt-3 align-items-center gap-2 fs-6 text-secondary text-uppercase" style={{letterSpacing : '2px'}}><span className={`order-box-icon ${status}`}></span>{status}<span className="text-secondary fs-6">({orders?.filter(ord => ord.status == status).length})</span></h3>
                            <Link to={`orders/${status}`}><i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
                        </div>

                        {orders?.filter(ord => ord.status == status).length > 0 ? orders?.filter(ord => ord.status == status).map(order => <OrderBox order={order} orderStatuses={orderStatuses} handleStatusChange={handleStatusChange} removeOrder={removeOrder}/>) : <EmptyAdminOrders status={status}/>}

                    </div>
                )))}

            </div>

        </div>
    );
};

export default ManageOrders;//exporting component