const OrderItem = ({ prod,prodId, key }) => {
    return(
        <div className="order-item container d-flex justify-content-between" key={prodId}>
            <div className="item-start d-flex">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
                <div className="item-details">
                    <h5>{prod?.title}</h5>
                    <small>{prod.description?.length < 40 ? `${prod?.description.slice(0,40)}...` : prod?.description}</small>
                </div>
            </div>
        </div>
    )
}

export default OrderItem