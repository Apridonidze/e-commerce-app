import Product from "./Product"

const Saved = ( { saved , handleSave , handleAddToCart } ) => {
    console.log(saved)
    return(
        <div className="saved-container col border border-2 my-3">
            <div className="saved-header position-relative d-flex justify-content-between" style={{bottom: '15px'}}>
                    
                <span className='bg-white' >{'Saved Products'|| <Skeleton />}</span> 
            </div>
            <div className="products">
                {saved?.map((prod , prodId) => (
                    <Product prod={prod} prodId={prodId} key={prodId} handleSave={handleSave} handleAddToCart={handleAddToCart}/>
                ))}
            </div>
        </div>
    )
}


export default Saved