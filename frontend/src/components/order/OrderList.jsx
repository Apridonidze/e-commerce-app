import { useRef, useState } from "react"; //importing react hooks
import OrderDetails from "./OrderDetails"; //importing react components
import EmptyAddress from "../../empty/EmptyAddress";
import EmptyOrders from "../../empty/EmptyOrders";

const OrderList = ({ setOrders, orders }) => {

    const [type , setType] = useState('NonDelivered'); //state to store type of orders user want to see

    const filteredOrders = orders?.filter(order => {
        if (type === 'Delivered') {
            return order.status === 'Delivered';
        } else {
            return order.status === 'Pending' || order.status === 'OnWay';
        }
    });

    return(
        <div className="order-list-container">

            <div className="order-list-header d-flex mb-2 justify-content-between align-items-end">
                <div className="order-list-start">
                    <h1>Order Archives</h1>
                    <h6>Manage your orders</h6>
                </div>
                <div className="order-list-end">
                    <button className={`btn border-0 ${type === 'NonDelivered' ? 'active' : ''}`} onClick={() => setType('NonDelivered')}>My Orders</button>
                    <button className={`btn border-0 ${type === 'Delivered' ? 'active' : ''}`} onClick={() => setType('Delivered')}>Delivered</button>
                </div>
            </div>

            {filteredOrders?.length > 0 ? (filteredOrders.map((order, orderId) => (<OrderDetails order={order} orderId={orderId} key={orderId} setOrders={setOrders}/>))) : (<EmptyOrders />)}

        </div>
    );
};

export default OrderList; //exporting component