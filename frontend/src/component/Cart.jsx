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

    return(
        <div className="cart-container">
            <div className="cart-start">
                <h3>Cart</h3>
            </div>
            <div className="cart-center">
                {cart?.length !== 0 ? cart.map((prod , prodId) => (
                    
                    <Item prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} />
                )) : 'no cart items'}
                {/* display only first 5 cart items */}
            </div>
            <div className="cart-end">
                {cart.length === 0 ? <button disabled>Order Items</button> : <button onClick={() => setToggleOrder(true)}>Order Items</button>}
            </div>
        </div >
    );
};

export default Cart; //exporting component