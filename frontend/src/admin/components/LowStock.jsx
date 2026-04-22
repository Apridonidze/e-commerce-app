import { Link } from "react-router-dom"
import Product from "../../components/product/Product"

import '../../styles/products.css'

const LowStock = ({ lowStock, setToggleEdit, setToggleRemove, setToggleReportProduct, setToggleAddToCart, setToggleAlert }) => {
    
    return(
        <div className="low-stock-container">
            <div className="low-stock-header">
                <h4><i class="fa-solid fa-arrow-down-1-9"></i> Low Stock Items</h4>
                <Link to='/admin-dashboard/low-stock'>Visit</Link>
            </div>
            <div className="low-stock-main">
                <div className="products ">
                    {lowStock?.length === 0 ? 'empty state' : lowStock?.map(prod => <Product prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart} setToggleAlert={setToggleAlert}/>)}
                </div>
            </div>
        </div>
    )
}

export default LowStock