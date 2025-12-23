import Skeleton from "react-loading-skeleton"
import ProductLine from "./ProductLine"

const DeliveredProducts = ({ delivered }) => {
    return(
        <div className="delivered-products-container">
            <h1>Delivered Products</h1>
            {delivered?.map((prod, prodId) => <ProductLine prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3} />}
        </div>
    )
}

export default DeliveredProducts