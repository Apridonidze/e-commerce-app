const MyProducts = ( { products } ) => {
    
    return(
        <div className="my-products-container">
            {products.products?.map((prod , prodId) => (
                <h1 key={prodId}>{prod.title}</h1>
            ))}
        </div>
    );
};

export default MyProducts