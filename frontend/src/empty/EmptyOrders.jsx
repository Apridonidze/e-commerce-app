const EmptyOrders = () => { //importing params from parent component (AdminDashboard.jsx)
    return(
        <div className="empty-orders-container">
            <div className="empty-order-icon"><i class="fa-solid fa-list-check"></i></div>
            <h3>You don’t have any  orders yet</h3>
            <h6>Once you place an order, it will appear here and move to delivered after completion.</h6>
        </div>
    );
};

export default EmptyOrders; //exporting component