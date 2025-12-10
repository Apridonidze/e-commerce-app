import Product from "./Product";

const MyProducts = ( { products } ) => {
    
    return(
        <div className="my-products-container">
            {products.products?.map((prod , prodId) => (
                <Product prod={prod} prodId={prodId} key={prodId} user={products.user}/>
            ))}
        </div>
    );
};

export default MyProducts