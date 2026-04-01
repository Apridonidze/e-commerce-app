const NoProduct = () => {
    return(
        <div className="no-product-container">
            <h4>No product found</h4>
            <h6>We couldn't find any items matching your current filters. Try refining your search terms</h6>
            <button className="btn border-0" style={{backgroundColor : '#10b981' , color : 'white'}}>Clear All Filters</button>
        </div>
    )
}

export default NoProduct