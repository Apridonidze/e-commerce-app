import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import Skeleton from "react-loading-skeleton"

import { BACKEND_URL } from "../../config"
import { Navigate, replace, useNavigate } from "react-router-dom"


const Product = ( { prod ,prodId , key, savedIds, cartIds } ) => {



    //check if amount is equal to 0 , if so toggle style of disable

    const [ cookies ] = useCookies(['token'])

    const [isSaved, setIsSaved] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const navigator = useNavigate()

    const handleSave = async(e) => {

        try{

            await axios.post(`${BACKEND_URL}/products/saved-products/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsSaved(true)})
            
        }catch(err){
            setIsSaved(false)
            console.log(err)
        }

    }

    const handleUnsave = async(e) => {

        try{

            await axios.delete(`${BACKEND_URL}/products/saved-products/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsSaved(false)})
            
        }catch(err){
            setIsSaved(true)
            console.log(err)
        }

    }

    const handleAddToCart = async(e) => {
        try{

            await axios.post(`${BACKEND_URL}/cart/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsInCart(true)})

        }catch(err){
            setIsInCart(false)
            console.log(err)
        }
    }

    const handleDeleteFromCart = async(e) => {
        try{

            await axios.delete(`${BACKEND_URL}/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setIsInCart(false)})

        }catch(err){
            setIsInCart(true)
            console.log(err)
        }
    }

    useEffect(() => {

        const id = prod.products_id

        const checkStatus = () => {

            if(!savedIds.includes(id)) setIsSaved(true)

            if(!cartIds.includes(id)) setIsInCart(true)

            return;

        }

        return () => {checkStatus()}
        
    },[savedIds, cartIds])

    return(
        <div className="product-container col-12 col-lg-5 d-flex flex-column border border-secondary rounded-2 p-2" onClick={() => {navigator(`/product/${prod.products_id}`); window.location.reload()}} style={{cursor: 'pointer'}} key={key} >

            <div className="product-wrapper">

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
                
                <button className="btn btn-warning" onClick={() => {isSaved ? handleUnsave(prod.products_id) : handleSave(prod.products_id)}}>Save</button>
                <button className="btn btn-warning" onClick={() => {isInCart ? handleDeleteFromCart(prod.products_id) : handleAddToCart(prod.products_id)}}>Add to Cart</button>
            </div>
          
        </div>
    )
}

export default Product