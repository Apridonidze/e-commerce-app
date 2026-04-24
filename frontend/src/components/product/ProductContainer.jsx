const ProductContainer = () => {
    return(
        <div className="product-container row" style={{maxWidth : 'fit-content'}}>
            <btn className={`more-button btn border-0 rounded-3 w-auto align-self-start ${!toggleMore && 'btn-none'}`} style={{fontSize : '12px', padding : '5px 8px', backgroundColor : toggleMore && '#10b981' , position : 'absolute' , right : '2rem'}} onClick={() => setToggleMore(!toggleMore)} >{toggleMore ? <i class="fa-solid fa-xmark text-white"></i> : <i class="fa-solid fa-ellipsis-vertical"></i>}</btn>                                 

                <div className="product-start col">
                    <div className="target-image-container" >
                        <img src={getImageSrc(imagesArray[targetImage])} alt="No Images" className="targetImage mb-2 justify-content-center d-flex align-items-center" /> 
                    </div>
                    {/* add iamges row here */}
                </div>

                <div className="product-end col">

                    <h4>{product.title}</h4>
                    <h6>{product.description}</h6>
                    <h6>{product.category} / {product.subcategory}</h6>
                    <h4>{product.price} {product.sales_price != null ? product.sales_price : ''}</h4>
                    <h5>Available: {product?.amount} Pieces</h5>

                    <div className="row mx-auto" style={{overflow: 'hidden'}}>
                        <div className="d-flex justify-content-between px-3 align-items-center ">

                            <div className="row-start px-1">
                                <span className="avalability rounded-5"  style={{fontSize:'14px', padding : '2px 10px', letterSpacing : '1px'}}>QUANTITY</span>
                            </div>

                            <div className="row-buttons row-end d-flex gap-2 align-items-center">
                                <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                                <span>{isInCart ? inCartAmount : amount}</span>
                                <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > product.amount)return prev; return prev + 1})}>+</button>
                            </div>
                            
                        </div>

                        <button className="btn border-0 px-3 py-2 mx-auto my-3 w-100 fw-bold" style={{backgroundColor : '#10b981', color :'white', maxWidth : '90%', height : '50px'}} onClick={() => handleAddToCart(toggleAddToCart.product?.products_id)} disabled={isInCart || amount == 0 ? true : false}><i class="fa-solid fa-cart-shopping text-white me-2"></i> Add To Cart</button>

                    </div>
                </div>
        </div>
    )
}

export default ProductContainer;