const EmptyAdminOrders = ({ status }) => { //importing params from parent component (ManageOrders.jsx)
    return(
        <div className="empty-orders-container">
            <div className="empty-order-icon">
                {status === "Pending" ? <i class="fa-solid fa-hourglass"></i> :  status === "OnWay" ? <i class="fa-solid fa-truck"></i> : <i class="fa-solid fa-list-check"></i>}
            </div>
            <h3>No {status?.toLowerCase()} orders yet.</h3>
            <h6>Wait untill user places an order, it will appear here.</h6>
        </div>
    );
};

export default EmptyAdminOrders; //exporting component