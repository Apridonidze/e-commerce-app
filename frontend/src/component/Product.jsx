import { useContext, useEffect, useState } from "react"; //importing react hooks

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../context/UserContext"; //importing user context
import { BACKEND_URL } from "../../config";//importing backend url from config file for api calls

import Skeleton from "react-loading-skeleton" // reloacte to skeletons 

import '../styles/products.css'; //importing css file

const Product = ( { prod ,prodId , key , setToggleEdit, setToggleRemove, setToggleReportProduct, setToggleAddToCart, setToggleAlert } ) => {

    const navigator = useNavigate();

    const [ cookies ] = useCookies(['token']); //defining user cookies
    const { user } = useContext(UserContext); //defining user context
    const { cartIds } = useContext(UserContext); //defining cart items ids from usercontext

    const [isInCart, setIsInCart] = useState(false); //state to trigger buttons based on if user has item on cart or not
    const [toggleMore, setToggleMore] = useState(false); //state to toggle toggleMore component

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
        <div className="product-container d-flex flex-column border border-secondary rounded-2 p-2" style={{cursor: 'pointer'}} key={prodId} >

            <div className="product-wrapper">

                {!user ? <></> : 
                <div className="more">
                    <btn className='btn' onClick={() => setToggleMore(!toggleMore)}>:</btn>
                    <div className="toggle-more" style={{ display : toggleMore ? 'flex' : 'none' , flexDirection: "column",position : "relative" , bottom : '25px'}}>
                        {user?.role == 'admin' ? 
                            <>
                                <button className="btn btn-primary" onClick={() => setToggleEdit({status : true , product : prod})}>Edit</button>
                                <button className="btn btn-danger" onClick={() => setToggleRemove({status : true , productId : prod.products_id})}>Remove</button>
                            </>
                        :
                            <>
                                <button className="btn btn-danger" onClick={() => setToggleReportProduct({status : true , productId : prod.products_id})}>Report</button>
                            </>
                        }
                    </div>
                </div>}

                <div className="product-top w-100 h-auto d-flex justify-content-center" onClick={() => {navigator(`/product/${prod.products_id}`); window.location.reload()}}>
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxWidth:'200px'}}/> || <Skeleton />}
                </div>
                    
                <div className="product-main">

                    <h5>{prod.title || <Skeleton count={1} width={'12vw'}/>}</h5>
                    <h5>{`${prod.category} / ${prod.subcategory}` || <Skeleton count={2}/>}</h5>

                    <h5>{prod?.price.toString().split('.').length > 1 ? prod.price : `${prod.price}.00` + '₾' || <Skeleton/>}</h5>
                    <h5>{`Items Left: ${prod?.amount}`|| <Skeleton/>}</h5>

                </div>

                <div className="product-bottom d-flex align-items-center" >
                    
                    {!user ? <></> : isInCart ? <button onClick={() => handleDeleteFromCart(prod?.products_id)}>In Cart</button> : <button onClick={() => setToggleAddToCart({status : true , product : prod})}>Add To Cart</button> }
                    
                </div>

            </div>
            
        </div>
    );
};

export default Product; //exporting component