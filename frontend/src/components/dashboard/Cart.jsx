import Item from "./Item"; //importing item component

import EmptyCart from "../../empty/EmptyCart"; //importing empty state component
import ItemSkeleton from "../../skeletons/ItemSkeleton"; //importing loading skeleton

const Cart = ({ setToggleOrder, cartIds, handleDeleteFromCart }) => {

    const total = cartIds?.reduce((sum, item) => {
        const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
        const amount = item.amount ?? 1; //defining items amount

        return sum + Number(price) * Number(amount); //returning total price
    }, 0); //calculating total price of items 

    return(
        <div className="cart-container overflow-hidden rounded-3 mb-5">
            <h3 className="mb-3">Current Cart</h3>

            <div className="cart-main">

                <div className="cart-start p-3">
                    {!cartIds ? Array.from({ length: 5 }).map((_, i) => <ItemSkeleton key={i} />) : cartIds.length ? cartIds?.map(prod => <Item prod={prod} handleDeleteFromCart={handleDeleteFromCart} />): <EmptyCart />}
                </div>

                {cartIds.length !== 0 ? 
                    <div className="cart-end p-3 d-flex justify-content-between align-items-center">
                        <div className="cart-end-left d-flex flex-column">
                            <span className="fw-light" style={{fontSize : '12px', letterSpacing : '0.5px'}}>CART TOTAL</span>
                            <span className="price fs-4 fw-bold">${total.toFixed(2)}</span>
                            <span style={{fontSize : '12px'}}>{total < 39 ? "*Cart total should be more than 40.00$ to place an order" : ""}</span>
                        </div>
                        <div className="cart-end-right">
                            <button className="buttonComponent btn btn-none text-white px-2 py-2" onClick={() => setToggleOrder(true)} disabled={cartIds.length !== 0 && total > 39 ? false: true}>Checkout Now <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div> 
                :  <></>}
            </div>
        </div >
    );
};

export default Cart; //exporting component