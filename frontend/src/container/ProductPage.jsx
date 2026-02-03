import { useParams } from "react-router-dom";

const ProductPage = () => {

    const prodId = useParams().id

    console.log(prodId)
    
    return(
        <div className="product-page-container">
            
        </div>
    )
}

export default ProductPage;