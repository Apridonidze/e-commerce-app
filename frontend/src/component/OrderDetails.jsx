import { useState } from "react";

const OrderDetails = ({order, orderId, key}) => {

    const [toggleDrop, setToggleDrop] = useState(false)

    return(
        <div className="order-details-container d-flex justify-content-between" key={orderId}>
            <div className="order-start">
                <h1>Order Status : {order.status}</h1>
                <h3>Ordered At: {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</h3>
                <h3>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h3>
            </div>
            <div className="order-end border h-100 d-flex flex-column align-items-end">
                <button className="btn btn-primary" onClick={() => setToggleDrop(!toggleDrop)}>:</button>
                <div className="toggle text-white" style={{ display : toggleDrop ? 'flex' : 'none' , flexDirection : 'column',position : 'relative', top : '10px'}}>
                    <button className="btn btn-danger">Discard Order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;