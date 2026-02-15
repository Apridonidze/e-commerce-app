import Skeleton from "react-loading-skeleton"
import AdminItem from "./AdminItem"

const DeliveredProducts = ({ delivered }) => {
    return(
        <div className="delivered-products-container">
            <h1>Delivered Products</h1>
            {delivered?.map((prod, prodId) => <AdminItem prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3} />}
        </div>
    )
}

export default DeliveredProducts