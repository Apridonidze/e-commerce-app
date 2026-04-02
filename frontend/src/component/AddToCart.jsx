import axios from "axios";
import { useCookies } from "react-cookie"; //impoirting react libraries 

import { BACKEND_URL } from "../../config"; //importing backend url from config file
import { useState } from "react"; //importing react hook

const AddToCart = ({ setToggleAddToCart, toggleAddToCart, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token']); //defining user cookeis for api call
 
    const [isInCart, setIsInCart] = useState(false);
    const [amount, setAmount] = useState(0);
    const [inCartAmount, setInCartAmount] = useState(0); //states for product references

    const handleAddToCart = async (productId) => {
        try {

            const response = await axios.post(`${BACKEND_URL}/api/cart/${productId}` ,{ amount }, {headers: { Authorization: `Bearer ${cookies.token}`}}); //calling api to save item in cart table
            
            if(response.status === 200){ //handling 200 status code response

                setInCartAmount(amount); //updating how many pieces of item we ordered
                setAmount(0); //reseting input button for pieces
                
                setIsInCart(true); // updating isInCart state
                
                setToggleAlert({status: true, type: "Success", statusCode: response.status, message: response.data.message}); //toggling success message
                setToggleAddToCart({status : false, product : null}); //untoggling AddToCart.jsx component
                
            };

        } catch (err) { //handling eeeors

            if(err.status === 400){ //handling 400 status code error
                
                setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});//toggling error message
            
                setIsInCart(false); //updating state to false 
            
                setInCartAmount(0);
                setAmount(amount); //reseting count states

            };

            // handling other status code errors

            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling internal error message
            
            setInCartAmount(0);
            setAmount(amount);
            setIsInCart(false); //reseting states
            
        };
    };

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
        
                    <h2>{toggleAddToCart.product.title}</h2>
                    <small className="text-break">{toggleAddToCart.product.description.length > 300 ? `${toggleAddToCart.product.description.slice(0,300)}...` : toggleAddToCart.product.description}</small>
                    <h5 style={{backgroundColor : '#10b981', color : 'white', width : 'fit-content', fontSize : '14px'}} className="px-2 py-1 rounded-2">{`${toggleAddToCart.product.category} / ${toggleAddToCart.product.subcategory}`}</h5>
                    
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
    );
};

export default AddToCart; //exporting component