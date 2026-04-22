const OrderBox = ({ order, orderStatuses, handleStatusChange, removeOrder }) => {//importing props from parent component (ManageOrders.jsx)
    return(
        <div className={`order-box-container ${order.status} p-2 rounded-3`} key={order.order_id}>
            
            <div className="order-box-header d-flex align-items-start justify-content-between">
                <div className="order-box-header-start">
                    <span className="fw-bold">#{order.order_id}</span>
                    <h6>{order.ordered_by}</h6>
                </div>

                <div className="order-box-header-end">
                    {order.status == 'Pending' ? <i className="fa-regular fa-hourglass-half"></i> : order.status == 'OnWay' ? <i className="fa-solid fa-truck"></i> : <i className="fa-solid fa-circle-check"></i>}
                </div>
                
            </div>
            <div className="order-box-main mb-2">
                {order.products.map((prod, id) => <span className="text-secondary fs-6" key={prod.product_id}>x{prod.amount} {prod.title}{id == order.products.length - 1 ? '' : ','} </span>)}
            </div>
            <div className="order-box-footer d-flex align-items-center justify-content-between">
                <select className="boxStatus form-control" disabled={order.status == 'Delivered'} defaultValue={order.status} onChange={(e) => handleStatusChange(order.order_id , e.target.value)}>
                    {orderStatuses.map(ord => 
                        <option key={ord} disabled={order.status == ord}>{ord}</option>
                    )}
                </select>
                <button className="deleteIcon btn-none border-0" disabled={order.status == 'Delivered'} onClick={() => removeOrder(order.order_id)}><i className=" fa-solid fa-trash-can" ></i></button>
            </div>
        </div>  
    );
};

export default OrderBox; //exporting component