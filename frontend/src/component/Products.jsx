import Skeleton from "react-loading-skeleton"
import ProductLine from "./ProductLine"

const Products = ({ latestProducts }) => {
    return(
        <div className="products-container">
            <h1>latest products</h1>
            {latestProducts?.map((prod, prodId) => <ProductLine prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3}/>}
        </div>
    )
}

export default Products