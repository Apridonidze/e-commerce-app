import { useRef, useState } from "react"; //importing react hooks
import OrderDetails from "./OrderDetails"; //importing react components

const OrderList = ({ setOrders, orders }) => {

    const [type , setType] = useState('Progress'); //state to store type of orders user want to see

    const btn1Ref = useRef(null);
    const btn2Ref = useRef(null);//refs for oders type button

    const handleToggleOrder = (e) => {

        e.preventDefault(); //handling page reload whne function in tirggered

        if(btn1Ref && btn1Ref.current && btn2Ref && btn2Ref.current){ //checking if refs are defined and executing logic
            
            const btn = e.currentTarget; //defining target button
            const buttons = [btn1Ref.current , btn2Ref.current]; //defining button refs

            btn.classList.add('active'); //adding active state to target button
            setType(btn.id); //storing type of ordesr user clicks to see
            
            buttons?.map((nonTarget) => nonTarget !== btn ? nonTarget.classList.remove('active') : nonTarget.classList.add('active')); //mapping over buttons refs and styling them based on if they are targeted or not
            
        };
    };

    return(
        <div className="order-list-container">

            <div className="order-list-header d-flex justify-content-between align-items-end">
                <div className="order-list-start">
                    <h1>Order Archives</h1>
                    <h6>Manage your orders</h6>
                </div>
                <div className="order-list-end">
                    <button className="btn border-0 active" id="Progress" onClick={(e) => handleToggleOrder(e)} ref={btn1Ref}>My Order</button>
                    <button className="btn border-0" id="Delivered" onClick={(e) => handleToggleOrder(e)} ref={btn2Ref}>Delivered</button>
                </div>
            </div>

            <h3>My Orders</h3>
            {orders?.length > 0 ? orders?.filter((order) => order.status !== type).map((order,orderId) => (
                <OrderDetails order={order} orderId={orderId} key={orderId} setOrders={setOrders}/>
            )) : `no ${type}`}

        </div>
    );
};

export default OrderList; //exporting component