import axios from "axios"

import Skeleton from "react-loading-skeleton"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import { useState } from "react"

const Product = ( { prod ,prodId , key } ) => {

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

    return(
        <div className="product-container col-12 col-lg-5 d-flex flex-column border border-secondary rounded-2 p-2" key={prodId} >

            <div className="product-wrapper">

                <div className="product-top w-100 h-auto" >
                        {prod.images ? prod.images?.map((img, imgId) => (
                            <img className="w-100 h-100 rounded-1" src={`data:image/jpeg;base64,${img}`} key={imgId} style={{maxHeight:'200px'}}/>
                        )) : prod.images === null ? <img src="" className="bg-grey w-100 h-100 border" style={{maxHeight: '200px'}}  alt="No Image Provided"/> : <Skeleton />}
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