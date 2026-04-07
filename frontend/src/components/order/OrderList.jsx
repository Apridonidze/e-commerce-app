import axios from "axios"
import { useEffect, useReducer, useRef, useState } from "react"
import { BACKEND_URL } from "../../../config"
import { useCookies } from "react-cookie"
import OrderDetails from "./OrderDetails"

const OrderList = () => {

    const [cookies] = useCookies(['token'])

    const [orders,setOrders] = useState([])
    const [type , setType] = useState('Progress')

    const btn1Ref = useRef(null);
    const btn2Ref = useRef(null);

    useEffect(() => {

        const fetchOrders = async() => {

            try{

                const orders = await axios.get(`${BACKEND_URL}/api/order`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                
                if(orders.status === 204) setOrders([])
                
                    console.log(orders)
                if(orders.status === 200){
                    setOrders(orders.data.orders)
                }

            }catch(err){
                console.log(err)
            }

        }

        return () => fetchOrders()

    },[])

    const handleToggleOrder = (e) => {

        e.preventDefault();

        if(btn1Ref && btn1Ref.current && btn2Ref && btn2Ref.current){
            
            const buttons = [btn1Ref.current , btn2Ref.current];

            const btn = e.currentTarget
            btn.classList.add('active')
            setType(btn.id)
            
            buttons.forEach((untargetedBtn) => {
                if(!untargetedBtn) return;

                if(untargetedBtn !== btn){
                    untargetedBtn.classList.remove('active')
                }
            })

        }


    }

    return(
        <div className="order-list-container">

            <div className="order-list-header d-flex justify-content-between align-items-end">
                <div className="order-list-start">
                    <h1>Order Archives</h1>
                    <h6>Manage your orders</h6>
                </div>
                <div className="order-list-end">
                    <button className="btn border-0" id="Progress" onClick={(e) => handleToggleOrder(e)} ref={btn1Ref}>My Order</button>
                    <button className="btn border-0" id="Delivered" onClick={(e) => handleToggleOrder(e)} ref={btn2Ref}>Delivered</button>
                </div>
            </div>

            <h3>My Orders</h3>
            {orders?.length > 0 ? orders?.filter((order) => order.status !== type).map((order,orderId) => (
                <OrderDetails order={order} orderId={orderId} key={orderId} setOrders={setOrders}/>
            )) : `no ${type}`}

        </div>
    )
}

export default OrderList