import axios from "axios";
import { useCookies } from "react-cookie"; //impoirting react libraries 

import { BACKEND_URL } from "../../config"; //importing backend url from config file
import { useState, useEffect } from "react"; //importing react hook

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

    useEffect(() => {
  if (toggleAddToCart.status) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  return () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };
}, [toggleAddToCart.status]);

    return(
        <div className="add-to-cart-container overflow-hidden" key={toggleAddToCart.product.prodcuts_id} style={{
            position: window.innerWidth < 598 ? 'fixed' : 'absolute',
            top: window.innerWidth >= 598 ? `${window.scrollY}px` : undefined,
            bottom: window.innerWidth < 598 ? '8rem' : undefined,
            width: window.innerWidth < 598 ? '95%' : undefined,
        }}>

            <div className="close-button-toggle">
                <button className="btn btn-none border-0"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div className="add-to-cart-start d-flex align-items-center h-100">
                <img src={`data:image/svg+xml;base64,${JSON.parse(toggleAddToCart.product.images)[0]}`}/>
            </div>

            <div className="add-to-cart-end w-100 h-100">

                <div className="close-button ">
                    <button className="btn btn-none border-0"><i class="fa-solid fa-xmark"></i></button>
                </div>
                      
                <div className="product-main py-2 px-3">
        
                    <h2 className="py-1">{toggleAddToCart.product.title.length > 20 ? `${toggleAddToCart.product.title.slice(0, 20)}...` : toggleAddToCart.product.title}</h2>
                    <small className="text-break">{toggleAddToCart.product.description.length > 300 ? `${toggleAddToCart.product.description.slice(0,300)}...` : toggleAddToCart.product.description}</small>
                    <h5 style={{backgroundColor : '#10b981', color : 'white', width : 'fit-content', fontSize : '14px'}} className="px-2 py-1 my-2 rounded-2">{`${toggleAddToCart.product.category} / ${toggleAddToCart.product.subcategory}`}</h5>
                    
                    <div className="product-amounts py-2 d-flex justify-content-between align-items-end">

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
                            <span className="avalability rounded-5" style={{fontSize:'14px', padding : '2px 10px'}}>{toggleAddToCart.product.amount} Items Left</span>
                        </div>
                    
                    </div>
        
                </div>

                <div className="row" >
                    <div className="d-flex justify-content-between px-4 align-items-center">
                        <div className="row-start px-1">
                            <span className="avalability rounded-5"  style={{fontSize:'14px', padding : '2px 10px', letterSpacing : '1px'}}>QUANTITY</span>
                        </div>
                        <div className="row-buttons row-end d-flex gap-2 align-items-center">
                            <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                            <span>{isInCart ? inCartAmount : amount}</span>
                            <button className="btn border-0" disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > toggleAddToCart.product.amount)return prev; return prev + 1})}>+</button>
                        </div>
                    </div>

                    <button className="btn border-0 px-3 py-2 mx-auto my-3 w-100 fw-bold" style={{backgroundColor : '#10b981', color :'white', maxWidth : '90%', height : '50px'}} onClick={() => handleAddToCart(toggleAddToCart.product.products_id)} disabled={isInCart || amount == 0 ? true : false}><i class="fa-solid fa-cart-shopping text-white me-2"></i> Add To Cart</button>

                </div>
        
                <div className="product-bottom d-flex gap-2 align-items-center p-3 fw-medium" style={{letterSpacing : '1px'}}>
                    <span className="productTags text-break"><i class="fa-solid fa-truck me-2"></i>FREE SHIPPING</span>
                    <span className="productTags"><i class="fa-solid fa-certificate me-2"></i>2 YEAR WARRANTY</span>
                </div>

            </div>

        </div>
    );
};

export default AddToCart; //exporting component