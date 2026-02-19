import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import Skeleton from "react-loading-skeleton" // reloacte to skeletons 

import { BACKEND_URL } from "../../config"
import {  useNavigate } from "react-router-dom"


const Product = ( { prod ,prodId , key, cartIds, setCartIds } ) => {

    //check if amount is equal to 0 , if so toggle style of disable

    const [ cookies ] = useCookies(['token'])

    const [isInCart, setIsInCart] = useState(false);

    const navigator = useNavigate()


    const handleAddToCart = async(e) => {
        try{

            await axios.post(`${BACKEND_URL}/api/cart/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsInCart(true)})

        }catch(err){
            setIsInCart(false)
            console.log(err)
        }
    }

    const handleDeleteFromCart = async(e) => {
        try{

            await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsInCart(false)})

        }catch(err){

            setIsInCart(true)
            console.log(err)
        }
    }
    //add 429, 400 status code handling for this events
    useEffect(() => {

        const id = prod.products_id

        const checkStatus = () => {

            if(!cartIds) setIsInCart(false);

       
            if(cartIds.includes(id)) setIsInCart(true)

            return;

        }

        return () => {checkStatus()}
        
    },[cartIds])

    return(
        <div className="product-container col-12 col-lg-5 d-flex flex-column border border-secondary rounded-2 p-2" style={{cursor: 'pointer'}} key={key} >

            <div className="product-wrapper" onClick={() => {navigator(`/product/${prod.products_id}`); window.location.reload()}}>

                <div className="product-top w-100 h-auto" >
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxHeight:'200px'}}/> || <Skeleton />}
                </div>
                    
                <div className="product-main">

                    <h5>{prod.title || <Skeleton count={1} width={'12vw'}/>}</h5>
                    <h5>{`${prod.category} / ${prod.subcategory}` || <Skeleton count={2}/>}</h5>

                </div>

                <div className="product-bottom d-flex align-items-center" >
                        
                    <h5>{prod?.price.toString().split('.').length > 1 ? prod.price : `${prod.price}.00` + '₾' || <Skeleton/>}</h5>
                    <h5>{`Items Left: ${prod?.amount}`|| <Skeleton/>}</h5>
                </div>

            </div>
            
            <div className="buttons position-relative w-100 h-100 align-items-center ">
                <img src='' alt="cart-icon" onClick={() => {isInCart ? handleDeleteFromCart(prod.products_id) : handleAddToCart(prod.products_id)}}/> {/* add src based on isInCart variable */}
            </div>
          
        </div>
    )
}

//TODO : when product cart status is updated remove/add it from usercontext where user cart items ids are reserved

export default Product