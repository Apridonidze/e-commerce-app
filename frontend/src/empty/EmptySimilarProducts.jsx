import { Link } from "react-router-dom";

const EmptySimilarProducts = () => {
    return(
        <div className="empty-low-stock-container rounded-3 p-3 w-100">
            <i className="fa-solid fa-magnifying-glass-minus rounded-3"></i>
            <h4>No similar products found</h4>
            <h6 className="fw-light">We couldn’t find any similar items at the moment. Check back later or explore other products.</h6>
            <Link to={'/'} className="mt-3">Browse Products</Link>
        </div>
    );
};

export default EmptySimilarProducts;