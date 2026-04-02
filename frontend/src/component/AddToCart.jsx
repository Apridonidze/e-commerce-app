import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useCookies } from "react-cookie";



const AddToCart = ({ setToggleAddToCart, toggleAddToCart }) => {

    const [ cookies ] = useCookies(['token'])
 
    const [isInCart, setIsInCart] = useState(false);
    const [amount, setAmount] = useState(0);
    const [inCartAmount, setInCartAmount] = useState(0);

    const handleAddToCart = async (productId) => {
        try {

            await axios.post(`${BACKEND_URL}/api/cart/${productId}`,{ amount },{ headers: { Authorization: `Bearer ${cookies.token}` } })
            setIsInCart(true)
            setInCartAmount(amount)
            setAmount(0)
            // toggle success message
            setToggleAddToCart({status : false, product : null})

        } catch (err) {
            // toggle alert message
            setIsInCart(false)
            setInCartAmount(0)
            setAmount(amount)
        }
    }

// refactor

    return(
        <div className="add-to-cart-container" style={{zIndex : 999}} key={toggleAddToCart.product.prodcuts_id} >
            <div className="add-to-cart-start">
                <img src={`data:image/svg+xml;base64,${JSON.parse(toggleAddToCart.product.images)[0]}`}/>
            </div>
            <div className="add-to-cart-end">
                      
                <div className="product-main">
        
                    <h5>{toggleAddToCart.product.title || <Skeleton count={1} width={'12vw'}/>}</h5>
                    <h5>{`${toggleAddToCart.product.category} / ${toggleAddToCart.product.subcategory}` || <Skeleton count={2}/>}</h5>
        
                    <h5>{toggleAddToCart.product.price.toString().split('.').length > 1 ? toggleAddToCart.product.price : `${toggleAddToCart.product.price}.00` + '₾' || <Skeleton/>}</h5>
                    <h5>{`Items Left: ${toggleAddToCart.product?.amount}`|| <Skeleton/>}</h5>
        
                </div>
        
                <div className="product-bottom d-flex align-items-center" >
                            
                    <div>
                        <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                        <span>{isInCart ? inCartAmount : amount}</span>
                        <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > toggleAddToCart.product.amount)return prev; return prev + 1})}>+</button>
                    </div>

                    <button onClick={() => handleAddToCart(toggleAddToCart.product.products_id)} disabled={isInCart || amount == 0 ? true : false}>Add To Cart</button>

                </div>
            </div>
        </div>
    )
}

export default AddToCart;