import '../styles/index.css'; //importing css file

const NoProduct = ({ fetchProducts, setCategory, setDropDownIndex }) => {
    return(
        <div className="no-product-container mx-auto mt-5 ">
            
            <div className="row mx-auto">
                {/* add icon herer */}
            </div>

            <div className="row mx-auto gap-2">
                <h4 className='fw-bold'>No product found</h4>
                <h6 style={{fontSize : '16px'}} >We couldn't find any items matching your current filters. Try refining your search terms.</h6>
            </div>

            <div className="row mx-auto">
                <button className="btn border-0 fw-medium w-50 mx-auto py-2" style={{backgroundColor : '#10b981' , color : 'white'}} onClick={() => {setCategory(null);setDropDownIndex({id : null , category : null}) ; fetchProducts(0,null)}}>Clear All Filters</button>
            </div>
        </div>
    );
};

export default NoProduct; //exporting component