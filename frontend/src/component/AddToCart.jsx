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
            <div className="add-to-cart-start d-flex align-items-center h-100">
                <img src={`data:image/svg+xml;base64,${JSON.parse(toggleAddToCart.product.images)[0]}`}/>
            </div>
            <div className="add-to-cart-end w-100 h-100">

                <div className="close-button d-flex justify-content-end">
                    <button className="btn btn-none border-0"><i class="fa-solid fa-xmark"></i></button>
                </div>
                      
                <div className="product-main">
        
                    <h2>{toggleAddToCart.product.title || <Skeleton count={1} width={'12vw'}/>}</h2>
                    <small className="text-break">{toggleAddToCart.product.description.length > 300 ? `${toggleAddToCart.product.description.slice(0,300)}...` : toggleAddToCart.product.description}</small>
                    <h5 style={{backgroundColor : '#10b981', color : 'white', width : 'fit-content', fontSize : '14px'}} className="px-2 py-1 rounded-2">{`${toggleAddToCart.product.category} / ${toggleAddToCart.product.subcategory}` || <Skeleton count={2}/>}</h5>
                    
                    <div className="product-amounts d-flex justify-content-between align-items-end">
                        <div className="amounts-start">
                            {!toggleAddToCart.product?.sales_price ? 
                                <span className="d-flex align-items-center justify-content-start fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${toggleAddToCart.product.price} </span> : 
                                <div className="sales-price">
                                    <span style={{textDecoration: 'line-through', fontSize: '14px'}}>${toggleAddToCart.product.price} </span>
                                    <span className="d-flex align-items-center justify-content-start fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${toggleAddToCart.product.sales_price} </span>
                                </div>    
                    }
                        </div>
                        <div className="amounts-end">
                            <h5>{`Items Left: ${toggleAddToCart.product?.amount}`|| <Skeleton/>}</h5>
                        </div>
                    
                    </div>
        
                </div>

                <div className="row">
                    <div className="d-flex justify-content-between ">
                        <div className="row-start">
                            <span>QUANTITY</span>
                        </div>
                        <div className="row-end">
                            <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                        <span>{isInCart ? inCartAmount : amount}</span>
                        <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > toggleAddToCart.product.amount)return prev; return prev + 1})}>+</button>
                        </div>
                    </div>

                    <button onClick={() => handleAddToCart(toggleAddToCart.product.products_id)} disabled={isInCart || amount == 0 ? true : false}>Add To Cart</button>

                </div>
        
                <div className="product-bottom d-flex align-items-center" >
                    <span>Free Shipping</span>
                
                </div>
            </div>
        </div>
    )
}

export default AddToCart;