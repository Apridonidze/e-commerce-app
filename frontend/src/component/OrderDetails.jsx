const OrderDetails = ({order, orderId, key}) => {
    return(
        <div className="order-details-container" key={orderId}>
            <h1>Order Status : {order.status}</h1>
            <h3>Ordered At: {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</h3>
            <h3>Expected Delivery: {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h3>
        </div>
    )
}

export default OrderDetails;