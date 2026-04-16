const OrderItem = ({ prod }) => {
    return(
        <div className="order-item p-3 d-flex gap-2 align-items-center justify-content-between" key={prod.product_id}>
            <div className="order-row d-flex gap-3">
                <img className="rounded-1 w-100 h-auto" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>
                <div className="item-details">
                    <h5>{prod.title}</h5>
                    <small>{prod.description.length < 35 ? `${prod?.description.slice(0,35)}...` : prod?.description}</small>
                </div>
            </div>
        </div>
    );
};

export default OrderItem; //exporting component