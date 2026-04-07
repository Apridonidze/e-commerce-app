import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { BACKEND_URL } from "../../../config"; //importing backend url from config file

import Item from "./Item"; 
import EmptyCart from "../../empty/EmptyCart"; //importing react components

const Cart = ({ setToggleAlert, setToggleOrder, setCartIds, cartIds }) => {

    const [cookies] = useCookies(['token']); //defining user cookies

    const handleDeleteFromCart = async(e) => {

        try{

            const response = await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            if(response.status === 200) { //hadning response success event
                setCartIds(cartIds.filter(c => c.product_id !== e)); //removing item from cartIds state
                setToggleAlert({status: true, type: "Success", statusCode: 200, message: "Product Removed From Cart Successfully"}); //toggling error message if customer intent could not be geneated
            };
            
        }catch(err){
            if(err.response?.status === 404) { //handling 404 status code
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: "Item Not Found In Your Cart"}); //toggling error message if customer intent could not be geneated
                setCartIds(cartIds); //setting cartIds state as default items
                return; //breaking action
            };

            // handling internal error event
            setCartIds(cartIds); //setting cartIds state as default items
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated

        };
    };

    const total = cartIds.reduce((sum, item) => {

        const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
        const amount = item.amount ?? 1; //defining items amount

        return sum + Number(price) * Number(amount); //returning total price

    }, 0); //calculating total price of items 

    return(
        <div className="cart-container overflow-hidden rounded-3 mb-5">
            <h3 className="mb-3">Current Cart</h3>

            <div className="cart-main">
                <div className="cart-start p-3">
                    {cartIds?.length !== 0 ? cartIds.map((prod) => (       
                        <Item prod={prod} handleDeleteFromCart={handleDeleteFromCart}/> || 'loading'
                    )) : <EmptyCart />}
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