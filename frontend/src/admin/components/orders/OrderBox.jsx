const OrderBox = ({ order, orderStatuses, handleStatusChange, removeOrder }) => {  
    
    return(
        <div className={`order-box-container ${order.status}`} key={order.order_id}>
            
            <div className="order-box-header d-flex align-items-center justify-content-between">
                <div className="order-box-header-start">
                    <span>#{order.order_id}</span>
                    <h5>{order.ordered_by}</h5>
                </div>

                <div className="order-box-header-end">
                    <span className="order-box-icon"></span>
                </div>
                
            </div>
            <div className="order-box-main">
                {order.products.map((prod, id) => <span className="text-secondary fs-6" key={prod.product_id}>x{prod.amount} {prod.title}{id == order.products.length - 1 ? '' : ','} </span>)}
            </div>
            <div className="order-box-footer">
                <select defaultValue={order.status} onChange={(e) => handleStatusChange(order.order_id , e.target.value)}>
                    {orderStatuses.map(ord => 
                        <option key={ord} >{ord}</option>
                    )}
                </select>
                <i class="fa-solid fa-trash-can" onClick={() => removeOrder(prod.product_id)}></i>
            </div>
        </div>  
    )
}

export default OrderBox