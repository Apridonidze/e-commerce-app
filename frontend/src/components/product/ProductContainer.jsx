const ProductContainer = ({ setToggleMore,setTargetImage,  amount,  toggleMore, imagesArray, getImageSrc,  targetImage, product, setAmount, isInCart, handleAddToCart, toggleAddToCart }) => {

    return(
        <div className="main-product-container">
            
            <button className={`more-button btn border-0 rounded-3 w-auto align-self-start ${!toggleMore && 'btn-none'}`} style={{fontSize : '12px', padding : '5px 8px', backgroundColor : toggleMore && '#10b981' , position : 'absolute' , right : '0px'}} onClick={() => setToggleMore(!toggleMore)} >{toggleMore ? <i class="fa-solid fa-xmark text-white"></i> : <i class="fa-solid fa-ellipsis-vertical"></i>}</button>                                 

            <div className="main-product-start d-flex flex-column gap-2">
                <div className="target-image-container" >
                    <img src={getImageSrc(imagesArray[targetImage])} alt="No Images" className="targetImage mb-2 justify-content-center d-flex align-items-center" /> 
                </div>
                <div className="image-rows">
                    {imagesArray.length == 0 ? <span className="text-center" style={{minHeight : '60px' , minWidth : '60px' , backgroundColor : "#f0f3ffA1"}}>No Image</span> : imagesArray.map((_ , id) => 
                        <img onClick={() => setTargetImage(id)} src={getImageSrc(imagesArray[id])} alt={`Image${id}`} className={`targetImage mb-2 justify-content-center d-flex align-items-center ${targetImage == id ? 'active' : ''}`} /> 
                    )}
                </div>
            </div>

                <div className="main-product-end">

                    <h4>{product.title}</h4>
                    <h6>{product.description}</h6>
                    <h6>{product.category} / {product.subcategory}</h6>
                    <h4>{product.price} {product.sales_price != null ? product.sales_price : ''}</h4>
                    
                    <div className="product-main-end d-flex flex-column text-end">
                        <small className="fw-medium mb-1">Avalability</small>
                        <span className="avalability rounded-5" style={{fontSize:'14px', padding : '2px 10px'}}>{product.amount > 0 ? `${product.amount} Items Left` : 'Out Of Stock'}</span>
                    </div>

                    <div className="row d-flex flex-column align-items-start" style={{overflow: 'hidden'}}>
                        <div className="d-flex justify-content-between align-items-center">

                            <div className="row-start d-flex justify-content-between">
                                <span className="avalability rounded-5"  style={{fontSize:'14px', padding : '2px 10px', letterSpacing : '1px'}}>QUANTITY</span>
                            </div>

                            <div className="row-buttons row-end d-flex gap-2 align-items-center">
                                <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                                <span>{isInCart ? inCartAmount : amount}</span>
                                <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > product.amount)return prev; return prev + 1})}>+</button>
                            </div>
                            
                        </div>

                        <button className="btn border-0 px-3 py-2 mt-2 w-100 fw-bold" style={{backgroundColor : '#10b981', color :'white', maxWidth : '100%', height : '50px'}} onClick={() => handleAddToCart(toggleAddToCart.product?.products_id)} disabled={isInCart || amount == 0 ? true : false}><i class="fa-solid fa-cart-shopping text-white me-2"></i> Add To Cart</button>

                    </div>
                </div>
        </div>
    )
}

export default ProductContainer;