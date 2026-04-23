const EmptyLowStock = () => {
    return(
        <div className="empty-low-stock-container rounded-3 p-3 w-100">
            <i class="fa-solid fa-arrow-down-1-9 rounded-3"></i>
            <h4>No low stock items</h4>
            <h6 className="fw-light">All products are sufficiently stocked. Items will appear here when inventory runs low.</h6>
        </div>
    );
};

export default EmptyLowStock;