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
            console.log(err)
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
            <div className="order-top  d-flex justify-content-between">
                <div className="order-start">
                    <h1>Order Status : {order.status}</h1>
                    <h3>Ordered At: {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</h3>
                    <h3>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h3>
                </div>
                <div className="order-end border h-100 d-flex flex-column align-items-end">
                    <button className="btn btn-primary" onClick={() => setToggleDrop(!toggleDrop)}>:</button>
                    <div className="toggle text-white" style={{ display : toggleDrop ? 'flex' : 'none' , flexDirection : 'column',position : 'relative', top : '10px'}}>
                        <button className="btn btn-danger" disabled={order.status === 'OnWay' || order.status === 'Delivered' ? true : false}  onClick={() => discardOrder(order.order_id)}>Discard Order</button>
                    </div>
                </div>
            </div>
            <div className="order-bottom">
                <div className="d d-flex justify-content-between">
                    <h4>Ordered Items</h4>
                    <button className="btn btn-primary" onClick={() => fetchOrderDetails(order.order_id)} type="button" data-toggle="collapse" data-target={`#collapseDiv${orderId}`} aria-expanded="false" aria-controls={`collapseDiv${orderId}`}>^</button>
                </div>
                <div className="collapse" id={`collapseDiv${orderId}`}>
                    {products?.map((prod, prodId) => <OrderItem prod={prod} prodId={prodId} key={prodId} />)}
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;