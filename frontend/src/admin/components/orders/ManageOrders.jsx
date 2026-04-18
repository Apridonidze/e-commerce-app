import axios from "axios";
import OrderBox from "./OrderBox";

import { BACKEND_URL } from "../../../../config";
import { useCookies } from "react-cookie";

const ManageOrders = ({ orders, setOrders, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token'])
    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered'];

    const handleStatusChange = async(id, status) => {
        try{

            const response = await axios.put(`${BACKEND_URL}/api/dashboard/${id}` , {status}, {headers : {Authorization : `Bearer ${cookies.token}`}})
            if(response.status === 200){
                setOrders(prevOrders => prevOrders?.map(ord => ord.order_id === id ? { ...ord, status: response.data.status } : ord))
            }

        }catch(err){
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }


    const removeOrder = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/admin-remove/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200)return setOrders(prev => prev.filter(ord => ord.order_id !== id))
            setToggleDrop(false)

        }catch(err){
            console.log(err)
           setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }

    return (
        <div className="manage-orders-container">
            <h1>Orders</h1>
            <div className="orders-container">

                {orderStatuses?.map((status => (    

                    <div className={`default-container ${status} p-2 rounded-3`}>
                        
                        <div className="manage-order-header d-flex justify-content-between mb-3 align-items-center">
                            <h3 className="d-flex mt-3 align-items-center gap-2 fs-6 text-secondary text-uppercase" style={{letterSpacing : '2px'}}><span className={`order-box-icon ${status}`}></span>{status}<span className="text-secondary fs-6">({orders?.filter(ord => ord.status == status).length})</span></h3>
                            <i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i>
                        </div>

                        {orders?.filter(ord => ord.status == status).length > 0 ? orders?.filter(ord => ord.status == status).map(order => <OrderBox order={order} orderStatuses={orderStatuses} handleStatusChange={handleStatusChange} removeOrder={removeOrder}/>) : 'Empty State'}

                    </div>

                )))}

            </div>
        </div>
    );
};

export default ManageOrders ; 