import Skeleton from "react-loading-skeleton"
import AdminItem from "./AdminItem"
const Products = ({ latestProducts }) => {
    return(
        <div className="products-container">
            <h1>latest products</h1>

            {latestProducts?.map((prod, prodId) => <AdminItem prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton count={3}/>}
        </div>
    )
}

export default Products