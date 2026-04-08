import CheckBox from './CheckBox'

const OrderCheckbox = ({ prod, handleCheckbox, checkboxRef, handleDeleteFromCart }) => {

    const handleImgCheckBox = () => {

        const checkbox = checkboxRef.current[prod?.product_id];
        if (!checkbox) return;

        checkbox.checked = !checkbox.checked;
        handleCheckbox({ target: checkbox }, Number(prod?.amount),prod.sales_price ?? prod.price ?? 0);
    };

    return(
        <div className="order-checkbox-container d-flex justify-content-between py-2 border-bottom mb-2 mx-2 gap-2" key={prod.products_id}>

            <div className="checkbox-start d-flex justify-content-between">

                <div className="checkbox-main d-flex gap-3 pb-2">

                        <div className="item-start position-relative" style={{maxHeight:'120px' , maxWidth : '180px', maxWidth: '180px'}} onClick={() => handleImgCheckBox()}>
                            <div className="position-absolute ms-2"  onClick={(e) => e.stopPropagation()} style={{backgroundColor : 'transparent'}}>
                                <CheckBox id={prod?.product_id} checkboxRef={checkboxRef} onChange={(e) => handleCheckbox(e, Number(prod?.amount), prod.sales_price ?? prod.price ?? 0)}/>
                            </div>
                            <img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} />
                        </div>
                        <div className="item-end d-flex flex-column text-start gap-3">
                            
                            <div className="item-top d-flex flex-column align-items-start justify-content-start">
                                <h5>{prod?.title}</h5>
                                <small>{prod.description?.length < 25 ? `${prod?.description.slice(0,25)}...` : prod?.description}</small>
                            </div>

                            <div className="item-bottom d-flex align-items-center gap-3 my-2">
                                
                                <span className="amount">{prod.amount} Pieces In Cart</span>

                                {!prod?.sales_price ? 
                                <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.price * prod.amount} </span> : 

                                  <div className="sales-price d-flex align-items-center  gap-2">
                                    <span style={{textDecoration: 'line-through', fontSize: '14px'}}>${prod.price} </span>
                                    <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.sales_price * prod.amount} </span>
                                </div>    
                            }
                                
                            </div>

                        </div>
                    </div>
                    
                </div>

                <div className="checkbox-end mx-2">
                    <i class="fa-solid fa-trash-can text-center justify-content-center d-flex fs-6" onClick={() => {handleDeleteFromCart(prod?.products_id)}}></i>
                </div>

            </div>
    );
};

export default OrderCheckbox;