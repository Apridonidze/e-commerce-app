const Item = ({ prod, handleDeleteFromCart}) => {
    return(
        <div className="item-container d-flex" key={prod.products_id}>
            <div className="item-start">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
            </div>
            <div className="item-main">
                <h5>{prod?.title}</h5>
                {prod.sales_price}
                {prod.price}
                <small>{prod.description?.length < 40 ? `${prod?.description.slice(0,40)}...` : prod?.description}</small>
            </div>
            <div className="item-end">
                <img src='' alt="cart-icon" onClick={() => {handleDeleteFromCart(prod?.products_id)}}/> {/* add image */}
            </div>
        </div>
    );
};

export default Item; //exporting component