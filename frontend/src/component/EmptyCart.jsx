const EmptyCart = () => {
    return(
        <div className="empty-cart-container">
            
            <i class="fa-regular fa-compass"></i>
            
            <h4>Your Cart Is Empty</h4>
            <h6>Browse products and add them to your cart.</h6>

            <button className="buttonComponent btn btn-none text-white px-2 py-2"><i class="fa-regular fa-compass"></i> Explore</button>

        </div>
    );
};

export default EmptyCart; //exporting component