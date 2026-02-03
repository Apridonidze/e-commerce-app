import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
;
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const ProductPage = () => {

    const prodId = useParams().id

    useEffect(() => {

        const fetchProduct = async() => {

            try{

                const product = await axios.get(`${BACKEND_URL}/products/${prodId}`)
                const feedback = await axios.get(`${BACKEND_URL}/feedback/platform-feedback`)
                console.log(feedback)
                console.log(product)
                // const product_feedback

            }catch(err){
                console.log(err)
            }

        }

        return () => fetchProduct()

    },[])

    
    
    return(
        <div className="main-container container-fluid row border">
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " >

                <Header />
                
            </div>
        </div>
    )
}

export default ProductPage;