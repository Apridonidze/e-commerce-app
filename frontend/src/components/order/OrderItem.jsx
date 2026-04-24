import { Link } from "react-router-dom"; //importing react library

const OrderItem = ({ prod }) => { //importing params from parent component (OrderDetails.jsx || ReportProduct.jsx)
    return(
        <div className="order-item py-2 d-flex gap-2 align-items-center justify-content-between" key={prod.product_id}>
            <div className="order-row d-flex gap-3 align-items-center">
                <div className="order-img d-flex justify-content-center align-items-center">
                    <Link to={`/product/${prod.product_id}`}>
                        <img className="rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>
                    </Link>
                </div>
                <div className="item-details">
                    <Link to={`/product/${prod.product_id}`}>
                        <h5>{prod.title}</h5>
                    </Link>

                    <small>{prod.description.length < 35 ? `${prod?.description.slice(0,35)}...` : prod?.description}</small>
                </div>
            </div>
        </div>
    );
};

export default OrderItem; //exporting component