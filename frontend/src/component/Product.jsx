import { useContext, useEffect, useState } from "react"; //importing react hooks

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../context/UserContext"; //importing user context
import { BACKEND_URL } from "../../config";//importing backend url from config file for api calls

import '../styles/products.css'; //importing css file

const Product = ( { prod ,prodId , key , setToggleEdit, setToggleRemove, setToggleReportProduct, setToggleAddToCart, setToggleAlert } ) => {

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

        if(cartIds?.some(cart => cart.product_id === prod?.products_id)) return setIsInCart(true); // checking if current product is included in cartIds array and if so setting isInCart state as true, if its not we are returning empty promise

    },[cartIds]) //logic executes on render and on cartIds change
   
    return(
        <div className="product-container d-flex flex-column rounded-1 " style={{cursor: 'pointer'}} key={prod.products_id} >
            <div className="product-more-background position-absolute w-100 h-100 start-0 top-0 opacity-0" style={{zIndex: 99, display : toggleMore ? 'flex' : 'none'}} onClick={() => setToggleMore(false)}></div>
            <div className="product-wrapper" onMouseEnter={() => setToggleBtn(true)} onMouseLeave={() => setToggleBtn(() => (toggleMore ? true : false))}>

                {!user ? <></> : 
                    <div className="more position-absolute m-2 align-self-end border" style={{zIndex : 100}}>

                        {toggleBtn ? 
                            <btn className={`more-button btn rounded-3 ${!toggleMore && 'btn-none'}`} style={{fontSize : '12px', padding : '5px 8px', backgroundColor : toggleMore && '#10b981'}} onClick={() => setToggleMore(!toggleMore)} >{toggleMore ? 
                                <i class="fa-solid fa-xmark text-white"></i> : 
                                <i class="fa-solid fa-ellipsis-vertical"></i>}</btn> 
                        : <></>}

                        <div className="toggle-more mt-1 rounded-2" style={{ display : toggleMore ? 'flex' : 'none' , flexDirection: "column" ,position : "absolute" , right : '0.2rem', }}>
                            {user?.role !== 'admin' ? 
                                <>
                                    <button className="btn text-primary d-flex align-items-center py-2 w-100" onClick={() => setToggleEdit({status : true , product : prod})}><i class="fa-regular fa-pen-to-square text-primary"></i> Edit</button>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100" onClick={() => setToggleRemove({status : true , productId : prod.products_id})}><i class="fa-regular fa-trash-can text-danger"></i> Remove</button>
                                </>
                            :
                                <>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100 gap-2" onClick={() => setToggleReportProduct({status : true , productId : prod.products_id})}><i class="fa-solid fa-flag text-danger"></i> Report</button>
                                </>
                            }
                        </div>
                    </div>
                }

                <div className="stock position-absolute mt-2 px-2 py-1 rounded-3 fw-medium" style={{backgroundColor: '#10b981', color :'dark'}}>
                    <small style={{fontSize : '14px'}}>{prod?.amount < 13  ? `${prod?.amount} Left` : 'In Stock'}</small>
                </div>

                <div className="product-top w-100 h-100 d-flex justify-content-center rounded-1" onClick={() => {navigator(`/product/${prod.products_id}`); window.location.reload()}}>
                    {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxWidth:'100%', maxHeight : '190px'}}/>}
                </div>
                    
                <div className="product-main d-flex justify-content-between">

                    <div className="product-main-start text-break">
                        <small style={{color : '#10b981'}}>{`${prod.category} / ${prod.subcategory}`}</small>
                        <h5 style={{fontSize : '22px'}}>{prod.title}</h5>
                    </div>
                    <div className="product-main-end border" >
                        <h5>{prod?.price.toString().split('.').length > 1 ? prod.price : `${prod.price}.00` + '₾' }</h5>
                    </div>

                </div>

                <div className="product-bottom d-flex align-items-center" >
                    
                    {!user ? <></> : isInCart ? 
                        <button onClick={() => handleDeleteFromCart(prod?.products_id)}>In Cart</button> : 
                        <button onClick={() => setToggleAddToCart({status : true , product : prod})}>Add To Cart</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default Product; //exporting component