const EmptyCart = () => {
    return(
        <div className="empty-cart-container d-flex flex-column align-items-center text-center p-3 ">
            
            <div class="icon-bg my-2"><i class="fa-solid fa-cart-shopping"></i></div>

            <h4>Your Cart Is Empty</h4>
            <small>Browse products and add them to your cart.</small>

            <button className="buttonComponent mt-4 btn btn-none text-white px-2 py-2"><i class="fa-regular fa-compass"></i> Explore</button>

        </div>
    );
};

export default EmptyCart; //exporting component