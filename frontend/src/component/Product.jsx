import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"

import Skeleton from "react-loading-skeleton"

import { BACKEND_URL } from "../../config"


const Product = ( { prod ,prodId , key } ) => {

    //check if amount is equal to 0 , if so toggle style of disable

    const [ cookies ] = useCookies(['token'])

    const [isSaved, setIsSaved] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const handleSave = async(e) => {

        try{

            await axios.post(`${BACKEND_URL}/products/saved-products/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))
            
        }catch(err){
            console.log(err)
        }

    }

    const handleAddToCart = async(e) => {
        try{

            await axios.post(`${BACKEND_URL}/cart/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))

        }catch(err){
            console.log(err)
        }
    }

    console.log(`data:image/jpeg;base64,${JSON.parse(prod.images)[0]}`)

    return(
        <div className="product-container col-12 col-lg-5 d-flex flex-column border border-secondary rounded-2 p-2" key={prodId} >

            <div className="product-wrapper">

                <div className="product-top w-100 h-auto" >
                    {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxHeight:'200px'}}/> || <Skeleton />}
                </div>
                    
                <div className="product-main">

                    <h5>{prod.title || <Skeleton count={1} width={'12vw'}/>}</h5>
                    <h5>{prod.description || <Skeleton count={2}/>}</h5>
                    <h5>{`${prod.category} / ${prod.subcategory}` || <Skeleton count={2}/>}</h5>

                </div>

                <div className="product-bottom d-flex align-items-center" >
                        
                    <h5>{prod?.price.toString().split('.').length > 1 ? prod.price : `${prod.price}.00` + '₾' || <Skeleton/>}</h5>
                    <h5>{`Items Left: ${prod?.amount}`|| <Skeleton/>}</h5>
                </div>

            </div>
            
            <div className="buttons position-relative w-100 h-100 align-items-center ">
                <button className="btn btn-warning" onClick={() => handleSave(prod.products_id)}>Save</button>
                <button className="btn btn-warning" onClick={() => handleAddToCart(prod.products_id)}>Add to Cart</button>
            </div>
          
        </div>
    )
}

export default Product