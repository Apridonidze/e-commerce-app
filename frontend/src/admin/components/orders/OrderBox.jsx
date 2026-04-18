const OrderBox = ({ setOrders, order }) => {
    return(
        <div className="order-box-container" key={order.order_id}>
            
            <div className="order-box-header">
                {order}
                <div className="order-box-header-start">
                    <span>#{order.order_id}</span>
                    <h5>{order.fullname}</h5>
                </div>
                <div className="order-box-header-end">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
            <div className="order-box-main"></div>
            <div className="order-box-footer"></div>
        </div>
    )
}

export default OrderBox