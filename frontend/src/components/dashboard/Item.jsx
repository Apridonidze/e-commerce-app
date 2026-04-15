import { useNavigate } from "react-router-dom"; //importing library

const Item = ({ prod, handleDeleteFromCart}) => {

    let images = [];

try {
  images = typeof prod.images === "string"
    ? JSON.parse(prod.images)
    : prod.images;
} catch (e) {
  images = [];
}
    
    const navigator = useNavigate(); //importing useNavigate from router library to redirect user to product clicked

    return(
        <div className="item-container d-flex gap-3 pb-2 my-2 pt-2" key={prod.products_id}>

            <div className="item-start" style={{maxHeight:'180px' , maxWidth: '280px', cursor : 'pointer'}} onClick={() => navigator(`/product/${prod.products_id}`)}>
                <img className="w-100 h-100 rounded-1" loading="lazy" src={`data:image/svg+xml;base64,${images?.[0] || ""}`} />
            </div>
            <div className="item-end d-flex flex-column text-start gap-3">
                
                <div className="item-container-top d-flex align-items-center justify-content-between">
                    <h5 style={{cursor : 'pointer'}} onClick={() => navigator(`/product/${prod.products_id}`)}>{prod?.title}</h5>
                    {!prod?.sales_price ? 
                    <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.price * prod.amount} </span> : 

                    <div className="sales-price">
                        <span style={{textDecoration: 'line-through', fontSize: '14px'}}>${prod.price} </span>
                        <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.sales_price * prod.amount} </span>
                    </div>    
                }
                </div>
                <div className="item-bottom">
                    
                    <small>{prod.description?.length < 25 ? `${prod?.description.slice(0,25)}...` : prod?.description}</small>
                    <div className="d-flex align-items-center gap-3 my-2" >

                        <div className="amount-buttons row-end d-flex gap-2 align-items-center" style={{cursor : 'pointer'}}>
                            <button className="btn border-0" disabled>-</button>
                            <span>{prod.amount}</span>
                            <button className="btn border-0" disabled>+</button>
                        </div>

                        <span style={{letterSpacing : '0.7px', fontSize : '14px', cursor : "pointer"}} className="fw-medium" onClick={() => {handleDeleteFromCart(prod?.products_id)}}>REMOVE</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Item; //exporting component