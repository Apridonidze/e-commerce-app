
import { useContext, useEffect, useState } from "react"

import Skeleton from "react-loading-skeleton" // reloacte to skeletons 
import { UserContext } from "../context/UserContext"



const Product = ( { prod ,prodId , key, cartIds, setCartIds } ) => {

    const [toggleMore, setToggleMore] = useState(false)
    const { user } = useContext(UserContext)

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

                {user.role !== 'admin' ? <></> : 
                <div className="more">
                    <span onClick={() => setToggleMore(!toggleMore)}>:</span>
                    <div className="toggle-more" style={{ display : toggleMore ? 'flex' : 'none' , flexDirection: "column",position : "relative" , bottom : '25px'}}>
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Remove</button>
                    </div>
                </div>}

                <div className="product-top w-100 h-auto d-flex justify-content-center" >
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxWidth:'200px'}}/> || <Skeleton />}
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
            
        </div>
    )
}

//TODO : when product cart status is updated remove/add it from usercontext where user cart items ids are reserved

export default Product