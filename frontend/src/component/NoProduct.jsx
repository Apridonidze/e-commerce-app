const NoProduct = ({ fetchProducts, setCategory, setDropDownIndex }) => {
    return(
        <div className="no-product-container">
            <h4>No product found</h4>
            <h6>We couldn't find any items matching your current filters. Try refining your search terms</h6>
            <button className="btn border-0 fw-medium" style={{backgroundColor : '#10b981' , color : 'white'}} onClick={() => {setCategory(null);setDropDownIndex({id : null , category : null}) ; fetchProducts(0,null)}}>Clear All Filters</button>
        </div>
    )
}

export default NoProduct