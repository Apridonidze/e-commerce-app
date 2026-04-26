import { Link } from "react-router-dom"; //importing react libraries

import EmptyLowStock from "../../empty/EmptyLowStock";

import '../../styles/products.css'; //importinf css styling file
import LowStockProduct from "../../components/product/LowStockProduct";
const LowStock = ({ lowStock, setToggleEdit, setToggleRemove}) => { //recieving props from parent componenet (AdminDashboard.jsx)
    return(
        <div className="low-stock-container my-5">

            <div className="low-stock-header">
                <h4><i class="fa-solid fa-arrow-down-1-9"></i> Low Stock Items</h4>
                <Link to='/admin-dashboard/low-stock'><i className="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
            </div>

            <div className="low-stock-main">
                
                {lowStock?.length !== 0 ? 
                   <div className="products">{lowStock?.map(prod => <LowStockProduct prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} />)}</div> : <EmptyLowStock />
                }
            </div>

        </div>
    );
};

                        
export default LowStock; //exporting component