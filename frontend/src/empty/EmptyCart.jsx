import { Link } from "react-router-dom";//importing link from react-router-dom library

const EmptyCart = () => {
    return (
        <div className="empty-cart-container w-100">
            <div className="empty-cart-wrapper d-flex flex-column align-items-center text-center w-100 p-3">
                <div className="icon-bg my-2"><i className="fa-solid fa-cart-shopping"></i></div>
                <h4>Your Cart Is Empty</h4>
                <small>Browse products and add them to your cart.</small>
                <Link to='/' style={{textDecoration : 'none'}}><button className="buttonComponent fs-6 mt-4 btn btn-none text-white px-2 py-2">
                    <i className="fa-regular fa-compass"></i> Explore
                </button></Link>
            </div>
        </div>
    );
};
export default EmptyCart; //exporting component