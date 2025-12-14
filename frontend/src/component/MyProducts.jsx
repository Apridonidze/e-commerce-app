import Product from "./Product";

const MyProducts = ( { products, setToggleCreateProduct , handleSave , handleAddToCart } ) => {

    return(
        <div className="my-products-container col border border-2 my-3">
            <div className="my-products-header position-relative d-flex justify-content-between" style={{bottom: '15px'}}>
                    
                <span className=' bg-white' >{'Your Products'|| <Skeleton />}</span> 
                <button className="btn btn-sm btn-success" onClick={() => {setToggleCreateProduct(true) ; document.body.classList.add('overflow-hidden')}}>Add New Product</button>
            </div>
            <div className="products ">
                {products?.map((prod , prodId) => (
                    <Product prod={prod} prodId={prodId} key={prodId} handleSave={handleSave} handleAddToCart={handleAddToCart}/>
                ))}
            </div>
        </div>
    );
};

export default MyProducts