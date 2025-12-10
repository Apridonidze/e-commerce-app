import Product from "./Product";

const MyProducts = ( { products, setToggleCreateProduct } ) => {
    
    return(
        <div className="my-products-container col border border-2 my-3">
            <div className="my-products-header position-relative d-flex justify-content-between" style={{bottom: '15px'}}>
                    
                <span className=' bg-white' >{'Your Products'|| <Skeleton />}</span> 
                <button className="btn btn-sm btn-success" onClick={() => setToggleCreateProduct(true)}>Add New Product</button>
            </div>
            {products.products?.map((prod , prodId) => (
                <Product prod={prod} prodId={prodId} key={prodId} user={products.user}/>
            ))}
        </div>
    );
};

export default MyProducts