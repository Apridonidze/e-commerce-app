const EmptyOrders = () => {
    return(
        <div className="empty-orders-container">
            <div className="empty-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <h3>You don’t have any orders yet   </h3>
            <h6>Once you place an order, it will appear here and move to delivered after completion.</h6>
        </div>
    );
};

export default EmptyOrders; //exporting component