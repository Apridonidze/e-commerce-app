import axios from "axios"
import { useEffect, useState } from "react"

import { BACKEND_URL } from '../../../../config'
import { useCookies } from "react-cookie"
import OrderItem from "../../../components/order/OrderItem"

import SmallItemSkeleton from "../../../skeletons/SmallItemSkeleton"

const AdminOrder = ({ order ,setOrders , orderStatuses, handleStatusChange, removeOrder }) => {

    const [ cookies ] = useCookies(['token'])



    const [openId, setOpenId] = useState(null); //state to trigger collapse button animation

    const [isLoading , setIsLoading] = useState(true); //state to trigger loading skeleton


    const [products,setProducts] = useState([])
    const [status,setStatus] = useState(order?.status)
    const [toggleDrop, setToggleDrop] = useState(false)

    const fetchOrderDetails = async(id) => {
        try{

            const response = await axios.get(`${BACKEND_URL}/api/order/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}}); //making api call

            setProducts(response.data.orderItems); //storing data in state
            setIsLoading(false); //storing false state to disable loading skeleton
            
        }catch(err){
            if(err.status == 404){ //handling 404 status code error
                setProducts([]); //setting empty array as products
                setIsLoading(false); //storing false state to disable loading skeleton
                return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if order details could not be fetched because of users provided order id
            };

            setProducts([]); //storing empty arrray as products
            setIsLoading(false); //storing false state to disable loading skeleton
            return setToggleAlert({status: true, type: "Internal Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if order details could not be fetched because of server error

        };
    };

    return(
        <div className="admin-order-details-container rounded-3 m-3" key={order.order_id}>

            <div className="admin-order-top d-flex align-items-center p-3 justify-content-between">

                <div className="admin-order-start w-100 d-flex gap-4">
                    
                    <div className="order-icon">
                        {order.status == 'Pending' ? <i class="fa-regular fa-truck"></i> : order.status == 'OnWay' ? <i class="fa-solid fa-clipboard-check"></i> : <i class="fa-solid fa-envelope-circle-check"></i>}
                    </div>
                    
                    <div className="d-flex flex-column">
                        <h4 className="fw-bold">Order - #{order.order_id}</h4>
                        <h6>{new Date(order.created_at).toLocaleDateString()}</h6>
                    </div>

                    <div className="d-block">
                        <h6>{order.fullname}</h6>
                        <h6 >{order.email}</h6>
                    </div>

                </div>

                <div className="admin-order-end h-100 d-flex gap-3 ">
                        
                        <div className="d-flex flex-column align-items-end">
                            <h6 style={{color : "#10b981"}} className="fw-bold fs-6 me-1">${order.total_price.toFixed(2)}</h6>
                            <select className="admin-order-status form-control " disabled={order.status == 'Delivered'} defaultValue={order.status} onChange={(e) => handleStatusChange(order.order_id , e.target.value)}>
                                {orderStatuses.map(ord => 
                                    <option key={ord} disabled={order.status == ord}>{ord}</option>
                                )}
                            </select>
                        </div>

                        <div className="admin-order-buttons d-flex align-items-center gap-1 ">
                            <button className="deleteIcon btn-none border-0 my-auto" disabled={order.status == 'Delivered'} onClick={() => removeOrder(order.order_id)}><i className=" fa-solid fa-trash-can" ></i></button>
                            <button className="btn fw-bold border-0 btn-none" onClick={() => {if (products.length === 0) fetchOrderDetails(order.order_id); setOpenId(prev => (prev === order.order_id ? null : order.order_id));}} type="button" data-toggle="collapse" data-target={`#collapseDiv${order.order_id}`} aria-expanded="false" aria-controls={`collapseDiv${order.order_id}`}><i className={`fa-solid fa-angle-right ${openId === order.order_id ? 'rotate' : ''}`}></i></button>
                        </div>
                </div>

            </div>

            <div className="admin-order-bottom p-0">
                <div className="collapse w-100 p-0" id={`collapseDiv${order.order_id}`}>

                    <h6 className="px-3 pt-3">Ordered Items</h6>
                    {isLoading ? <SmallItemSkeleton /> : products?.map(prod => <OrderItem prod={prod} />)}
                </div>
            </div>

        </div>
    )
}
export default AdminOrder