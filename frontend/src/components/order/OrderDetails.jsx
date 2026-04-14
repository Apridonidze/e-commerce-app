import axios from "axios";
import { useCookies } from "react-cookie";

import { useState } from "react";

import OrderItem from "./OrderItem";

import { BACKEND_URL } from "../../../config";

const OrderDetails = ({order, orderId, key , setOrders}) => {

    const [ cookies ] = useCookies(['token'])

    const [products,setProducts] = useState([]);
    const [toggleDrop, setToggleDrop] = useState(false)

    const fetchOrderDetails = async(id) => {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/order/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})
            console.log(response)

            setProducts(response.data.orderItems)

        }catch(err){
            // toggle error message
            console.log(err.response)
        }
    }
    
    const discardOrder = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200)return setOrders(prev => prev.filter(ord => ord.order_id !== order.order_id))
            // toggle stattus 400 alert messagee
            setToggleDrop(false)

        }catch(err){
            // toggle alert message
            console.log(err)
        }
    }

    return(
        <div className="order-details-container" key={orderId}>

            <div className="order-top border d-flex justify-content-between">
                <div className="order-start d-flex gap-2">
                    
                    <div className="order-icon">{order.status == 'Pending' ? <i class="fa-regular fa-truck"></i> : order.status == 'OnWay' ? <i class="fa-solid fa-clipboard-check"></i> : <i class="fa-solid fa-envelope-circle-check"></i>}</div>
                    
                    <div className="d">
                        <div className="d-flex">
                            <h4>Order #{order.order_id}</h4>
                            <span className={`order ${order.status}`}> {order.status}</span>
                        </div>
                        <h6>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h6>
                    </div>

                </div>
                <div className="order-end border h-100 d-flex flex-column align-items-end border">
                    <button className="btn btn-primary" onClick={() => setToggleDrop(!toggleDrop)}>:</button>
                    <div className="toggle text-white" style={{ display : toggleDrop ? 'flex' : 'none' , flexDirection : 'column',position : 'relative', top : '10px'}}>
                        <button className="btn btn-danger" disabled={order.status === 'OnWay' || order.status === 'Delivered' ? true : false}  onClick={() => discardOrder(order.order_id)}>Discard Order</button>
                    </div>
                    <div className="d d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => {products.length == [] ? fetchOrderDetails(order.order_id) : ''}} type="button" data-toggle="collapse" data-target={`#collapseDiv${orderId}`} aria-expanded="false" aria-controls={`collapseDiv${orderId}`}>^</button>
                </div>
                </div>
            </div>

            <div className="order-bottom">
                
                <div className="collapse" id={`collapseDiv${orderId}`}>
                    {products?.map((prod, prodId) => <OrderItem prod={prod} prodId={prodId} key={prodId} />)}
                </div>
            </div>

        </div>
    )
}

export default OrderDetails;