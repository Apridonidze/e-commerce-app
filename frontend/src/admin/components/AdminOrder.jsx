const AdminOrder = ({ order, orderId, key }) => {
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
                    <button className="btn btn-primary" onClick={() => handleCollapse()} type="button" data-toggle="collapse" data-target={`#collapseDiv${orderId}`} aria-expanded="false" aria-controls={`collapseDiv${orderId}`}>^</button>
                    
                </div>
            </div>
            <div className="order-bottom">
                <div className="collapse" id={`collapseDiv${orderId}`}>asdsd</div>
            </div>
        </div>
    )
}
export default AdminOrder