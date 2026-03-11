import axios from "axios"
import { useState } from "react"

import { BACKEND_URL } from '../../../config'
import { useCookies } from "react-cookie"

import OrderItem from "../../component/OrderItem"

const AdminOrder = ({ order, orderId, key }) => {

    const [ cookies ] = useCookies(['token'])

    const [products,setProducts] = useState([])

    const fetchOrderDetails = async(id) => {
        try{

            const response = await axios.get(`${BACKEND_URL}/api/order/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            setProducts(response.data.orderItems)

        }catch(err){
            // toggle error message
            console.log(err)
        }
    }

    return(
        <div className="admin-order-container" key={orderId}>
            <div className="order-top d-flex justify-content-between">
                <div className="top-start">
                    <h3>Customer : {order.fullname} {order.email}</h3>
                    {order.status}
                    {order.total_price}
                    {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                </div>
                <div className="top-end">
                    <button className="btn btn-primary" onClick={() => fetchOrderDetails(order.order_id)} type="button" data-toggle="collapse" data-target={`#collapseDiv${orderId}`} aria-expanded="false" aria-controls={`collapseDiv${orderId}`}>^</button>
                    
                </div>
            </div>
            <div className="order-bottom">
                <div className="collapse" id={`collapseDiv${orderId}`}>
                    {products?.map((prod, prodId) => <OrderItem prod={prod} prodId={prodId} key={prodId}/>)}
                </div>
            </div>
        </div>
    )
}
export default AdminOrder