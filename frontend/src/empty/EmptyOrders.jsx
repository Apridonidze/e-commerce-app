const EmptyOrders = ({ status }) => { //importing params from parent component (ManageOrders.jsx)
    return(
        <div className="empty-orders-container">
            <div className="empty-order-icon">
                {status === "Pending" ? <i class="fa-solid fa-hourglass"></i> :  status === "OnWay" ? <i class="fa-solid fa-truck"></i> : <i class="fa-solid fa-list-check"></i>}
            </div>
            <h3>You don’t have any {status.toLowerCase()} orders yet</h3>
            <h6>Once you place an order, it will appear here and move to delivered after completion.</h6>
        </div>
    );
};

export default EmptyOrders; //exporting component