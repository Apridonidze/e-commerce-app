import axios from "axios"
import { BACKEND_URL } from "../../config"

import { useState,useEffect } from "react"

import { createContext } from "react"

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {

    const [prevProducts,setPrevProducts] = useState([])
    
    useEffect(() => {

        const fetchProducts = async() => {

        try{

            const product = await axios.get(`${BACKEND_URL}/api/product`)
            
            if(product.status === 204) setPrevProducts([])
            setPrevProducts(product.data.products)

        }catch(err){
            setPrevProducts([])
            console.log(err)
            //toggle allert message and pass errors
        }
    }
        

        return () => {fetchProducts()}
    },[])

    return(
        <ProductContext.Provider value={prevProducts}>{children}</ProductContext.Provider>
    )
}