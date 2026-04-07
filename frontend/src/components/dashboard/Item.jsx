const Item = ({ prod, handleDeleteFromCart}) => {
    return(
        <div className="item-container d-flex gap-2 pb-2" key={prod.products_id}>

            <div className="item-start">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'180px' , maxWidth : '180px'}}/>}
            </div>
            <div className="item-main d-flex flex-column text-start">
                <h5>{prod?.title}</h5>
                <small>{prod.description?.length < 40 ? `${prod?.description.slice(0,40)}...` : prod?.description}</small>
                <div className="d-flex align-items-center gap-3">

                    <div className="amount-buttons row-end d-flex gap-2 align-items-center">
                        <button className="btn border-0" disabled>-</button>
                        <span>{prod.amount}</span>
                        <button className="btn border-0" disabled>+</button>
                    </div>

                    <span style={{letterSpacing : '0.7px', fontSize : '12px'}} onClick={() => {handleDeleteFromCart(prod?.products_id)}}>REMOVE</span>
                </div>
            </div>

            <div className="item-end">
                {!prod?.sales_price ? 
                    <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.price * prod.amount} </span> : 

                    <div className="sales-price">
                        <span style={{textDecoration: 'line-through', fontSize: '14px'}}>${prod.price} </span>
                        <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.sales_price * prod.amount} </span>
                    </div>    
                }
            </div>

        </div>
    );
};

export default Item; //exporting component