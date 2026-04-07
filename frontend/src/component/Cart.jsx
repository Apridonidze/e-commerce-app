import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect } from "react"; //importing react state
import { BACKEND_URL } from "../../config"; //importing backend url from config file

import Item from "./Item"; //importing Item component to display cart items 

const Cart = ({ setToggleAlert, setToggleOrder, setCart, cart }) => {

    const [cookies] = useCookies(['token']); //defining user cookies

    useEffect(() => {

        const fetchCartItems = async() => {//fetching user cart items from backend
            try{

                const cartItems = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}}); //calling api
                
                if(cartItems.status === 204)return setCart([]); //handing 204 status code and setting cart state as empty array
                setCart(cartItems.data.cartItems); //storing data in state

            }catch(err){ //handling errors

                setCart([]); //setting cart state as empty array
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            
            };
        };

        fetchCartItems(); //declearing function

    },[]);

    const total = cart.reduce((sum, item) => {
        const price = item.sales_price ?? item.price ?? 0;
        const amount = item.amount ?? 1;

        return sum + Number(price) * Number(amount);
    }, 0);

    return(
        <div className="cart-container">
            <h3>Current Cart</h3>

            <div className="cart-main rounded-3">
                <div className="cart-start">
                    {cart?.length !== 0 ? cart.slice(0, 5).map((prod , prodId) => (       
                        <Item prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} />
                    )) : 'no cart items'}
                </div>

                <div className="cart-end d-flex justify-content-between align-items-center">
                    <div className="cart-end-left d-flex flex-column">
                        <span className="fw-light">Total</span>
                        <span className="price fs-5 fw-bold">${total.toFixed(2)}</span>
                    </div>
                    <div className="cart-end-right">
                        <button onClick={() => setToggleOrder(true)} disabled={cart.length == 0 ? true : false}>Order Items</button>
                    </div>
                </div>
            </div>
            
        </div >
    );
};

export default Cart; //exporting component