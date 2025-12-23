import Skeleton from "react-loading-skeleton"
import ProductLine from "./ProductLine"

const OnWayProducts = ({ onway }) => {
    return(
        <div className="on-way-products-container">
            <h1>On Way Products</h1>
            {onway?.map((prod, prodId) => <ProductLine prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3}/>}
        </div>
    )
}

export default OnWayProducts