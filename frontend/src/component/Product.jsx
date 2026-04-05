import { useContext, useEffect, useState } from "react"; //importing react hooks

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../context/UserContext"; //importing user context
import { BACKEND_URL } from "../../config";//importing backend url from config file for api calls

import '../styles/products.css'; //importing css file

const Product = ( { prod , setToggleEdit, setToggleRemove, setToggleReportProduct, setToggleAddToCart, setToggleAlert } ) => {

    const navigator = useNavigate();

    const [ cookies ] = useCookies(['token']); //defining user cookies
    const { user } = useContext(UserContext); //defining user context
    const { cartIds } = useContext(UserContext); //defining cart items ids from usercontext

    const [isInCart, setIsInCart] = useState(false); //state to trigger buttons based on if user has item on cart or not
    const [toggleMore, setToggleMore] = useState(false); //state to toggle toggleMore component
    const [toggleBtn, setToggleBtn] = useState(false); //state to toggle three dots button

    const handleDeleteFromCart = async (productId) => {
        try {
            
            const response = await axios.delete(`${BACKEND_URL}/api/cart/${productId}`, { headers: { Authorization: `Bearer ${cookies.token}`}}); //calling api to delete item from cart with product_id of passed params

            if(response.status === 200)setIsInCart(false); //removing from state if api success
            
        } catch(err){ //handling errors
            if(err.status === 404){ //reutrning 404 status code if product is not found in your cart 
                setIsInCart(false);//returning false state since we do not have item in cart
                setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message and passing error message
            }else{ //handling internal error
                setIsInCart(true); //returning true state since item could not be removed from clients cart
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //returning internal error message
            };
        };
    };


    useEffect(() => {

        if(cartIds?.some(cart => cart.product_id == prod?.products_id)) return setIsInCart(true);
        return;  // checking if current product is included in cartIds array and if so setting isInCart state as true, if its not we are returning empty promise

    },[cartIds]) //logic executes on render and on cartIds change
   
    return(
        <div className="product-container d-flex flex-column rounded-1 " style={{cursor: 'pointer'}} key={prod.products_id} >
            <div className="product-more-background position-absolute w-100 h-100 start-0 top-0 opacity-0" style={{zIndex: 99, display : toggleMore ? 'flex' : 'none'}} onClick={() => setToggleMore(false)}></div>
            <div className="product-wrapper" onMouseEnter={() => setToggleBtn(true)} onMouseLeave={() => setToggleBtn(() => (toggleMore ? true : false))}>

                {!user ? <></> : 
                    <div className="more position-absolute mt-3 me-2 align-self-end " style={{zIndex : 100}}>

                        {toggleBtn ? 
                            <btn className={`more-button btn border-0 rounded-3  ${!toggleMore && 'btn-none'}`} style={{fontSize : '12px', padding : '5px 8px', backgroundColor : toggleMore && '#10b981'}} onClick={() => setToggleMore(!toggleMore)} >{toggleMore ? 
                                <i class="fa-solid fa-xmark text-white"></i> : 
                                <i class="fa-solid fa-ellipsis-vertical"></i>}</btn> 
                        : <></>}

                        <div className="toggle-more mt-1 rounded-2 " style={{ display : toggleMore ? 'flex' : 'none' , flexDirection: "column" ,position : "absolute" , right : '0.2rem' }}>
                            {user?.role == 'admin' ? 
                                <>
                                    <button className="btn text-primary d-flex align-items-center py-2 w-100 rounded-0" onClick={() => setToggleEdit({status : true , product : prod})}><i class="fa-regular fa-pen-to-square text-primary"></i> Edit</button>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100" onClick={() => setToggleRemove({status : true , productId : prod?.products_id})}><i class="fa-regular fa-trash-can text-danger"></i> Remove</button>
                                </>
                            :
                                <>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100 gap-2" onClick={() => setToggleReportProduct({status : true , productId : prod.products_id})}><i class="fa-solid fa-flag text-danger"></i> Report</button>
                                </>
                            }
                        </div>
                    </div>
                }

                <div className="product-top w-100 d-flex justify-content-center rounded-1 pt-2 " style={{minHeight : '200px'}} onClick={() => {navigator(`/product/${prod.products_id}`); window.location.reload()}}>
                    {<img className="w-100 h-100 pb-2" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{ minWidth:'90%', maxWidth:'290px', maxHeight : '190px', borderRadius : '10px'}}/>}
                </div>
                    
                <div className="product-main ">

                        <h5 className="text-break fw-medium ps-1" style={{fontSize : '22px'}}>{prod.title.length < 22 ? prod.title  : `${prod.title.slice(0,22)}...`}</h5>
                   
                        <div className="product-main-container d-flex justify-content-between align-items-end pt-1">
                            <div className="product-main-start ">
                                {!prod?.sales_price ? 
                                <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.price} </span> : 
                                <div className="sales-price">
                                    <span style={{textDecoration: 'line-through', fontSize: '14px'}}>${prod.price} </span>
                                    <span className="d-flex align-items-center justify-content-end fw-bold" style={{fontSize : '20px', color : '#10b981'}}>${prod.sales_price} </span>
                                </div>    
                            }
                            </div>
                            <div className="product-main-end d-flex flex-column text-end">
                                <small className="fw-medium mb-1">Avalability</small>
                                <span className="avalability rounded-5" style={{fontSize:'14px', padding : '2px 10px'}}>{prod.amount} Items Left</span>
                            </div>
                        </div>

                </div>

                <div className="product-footer d-flex align-items-center border-0" >
                    
                    {!user ? <></> : isInCart ? 
                        <button className="btn w-100 fw-bold" style={{backgroundColor : '#10b981', color :'white', height : '50px'}} onClick={() => handleDeleteFromCart(prod?.products_id)}><i class="fa-solid fa-cart-shopping text-white me-2"></i> In Cart</button> : 
                        <button className="btn w-100 fw-bold" style={{backgroundColor : '#10b981', color :'white', height : '50px'}} onClick={() => setToggleAddToCart({status : true , product : prod})}><i class="fa-solid fa-cart-shopping text-white me-2"></i>Add To Cart</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default Product; //exporting component