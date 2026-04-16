import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useState } from "react"; //importing react hook
import { BACKEND_URL } from "../../../config"; //importing backend url from config file

import OrderItem from "./OrderItem"; //importing react component
import SmallItemSkeleton from "../../skeletons/SmallItemSkeleton"; //importing loading skeleton

const OrderDetails = ({ order, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token']); //definin user cookies

    const [products,setProducts] = useState([]); //state to store order's product list
    const [openId, setOpenId] = useState(null); //state to trigger collapse button animation

    const [isLoading , setIsLoading] = useState(true); //state to trigger loading skeleton

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
        <div className="order-details-container rounded-3 my-2" key={order.order_id}>

            <div className="order-top d-flex align-items-center p-3 justify-content-between">

                <div className="order-start d-flex gap-2">
                    
                    <div className="order-icon">
                        {order.status == 'Pending' ? <i class="fa-regular fa-truck"></i> : order.status == 'OnWay' ? <i class="fa-solid fa-clipboard-check"></i> : <i class="fa-solid fa-envelope-circle-check"></i>}
                    </div>
                    
                    <div className="d">
                        <div className="d-flex gap-3">
                            <h4 className="fw-bold">Order #{order.order_id}</h4>
                            <span className={`orderStatus ${order.status} rounded-1 py-1`}> {order.status}</span>
                        </div>
                        <h6>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h6>
                    </div>

                </div>

                <div className="order-end h-100 d-flex align-items-center gap-3 ">
                    <div className="d-flex flex-column">
                        <span style={{letterSpacing : '1px'}} className="fw-medium text-secondary">TOTAL VALUE</span><br />
                        <span className="fw-bold">${order.total_price?.toFixed(2)}</span>
                    </div>
                    <div className="d d-flex justify-content-between">
                        <button className="btn fw-bold border-0 btn-none" onClick={() => {if (products.length === 0) fetchOrderDetails(order.order_id); setOpenId(prev => (prev === order.order_id ? null : order.order_id));}} type="button" data-toggle="collapse" data-target={`#collapseDiv${order.order_id}`} aria-expanded="false" aria-controls={`collapseDiv${order.order_id}`}><i className={`fa-solid fa-angle-right ${openId === order.order_id ? 'rotate' : ''}`}></i></button>
                    </div>
                </div>

            </div>

            <div className="order-bottom p-0">
                <div className="collapse w-100 p-0" id={`collapseDiv${order.order_id}`}>

                    <h6 className="px-3 pt-3">Ordered Items</h6>
                    {isLoading ? <SmallItemSkeleton /> : products?.map(prod => <OrderItem prod={prod} />)}
                </div>
            </div>

        </div>
    );
};

export default OrderDetails; //exporting component