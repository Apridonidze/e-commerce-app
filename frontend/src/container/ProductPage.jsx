import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
;
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Skeleton from 'react-loading-skeleton';
Skeleton
const ProductPage = () => {

    const prodId = useParams().id

    const [product,setProduct] = useState();
    const [feedback, setFeedback] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {

        const fetchProduct = async() => {

            try{

                const product = await axios.get(`${BACKEND_URL}/products/${prodId}`)
                const feedback = await axios.get(`${BACKEND_URL}/feedback/product-feedback/${prodId}`)
                
                setProduct(product.data.product)
                setFeedback(feedback.data.feedback)

                fetchSimilarProducts(product.data.product.subcategory)

            }catch(err){
                console.log(err)
                // add erorr handling here based on statuses 500, 400 and 204 , 404
            }
        }


        const fetchSimilarProducts = async (category) => {
            try{

                //add checking responses

                const products = await axios.get(`${BACKEND_URL}/similar-products/${category}`)
                setSimilarProducts(products.data.products)

            }catch(err){
                // add erorr handling here based on statuses 500, 400 and 204 , 404
                console.log(err)
            }
        }

        return () => fetchProduct()

    },[])

    // add post feedback function
    
    const imagesArray = product && JSON.parse(product.images);
    

    return(
        <div className="main-container container-fluid row border">
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " >

                <Header />


                <div className="product-container row">
                    <div className="product-start col">

                        {imagesArray?.map((img, index) => (
                            <img key={index} src={`data:image/jpeg;base64,${img}`} alt={`product-${index}`} style={{maxWidth : '400px', height: 'auto'}}/>
                        ))}
                        {/* add slider for images if there is more images than 1 */}

                    </div>
                    <div className="product-end col">
                        <div className="d">
                            <h4>{product?.title}</h4>
                            <h6>{product?.description}</h6>
                            <h6>{product?.category} / {product?.subcategory}</h6>
                            <h4>{product?.price}</h4>
                            <h5>Avaliable : {product?.amount} Pieces</h5>
                        </div>
                        <div className="d">
                            <button>Save</button>
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </div>


                {/* add loading skeleton for this component also */}

                <div className="feedback">
                    <div className="feedback-header">
                        <h3>Product Reviews: </h3>
                    </div>
                    <div className="feedback-main">

                        <div className="feedback-input d-flex">
                            <div className="form-floating">
                                <input type="text" className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>
                                <label htmlFor="fb-input">Leave Your Feedback...</label>
                            </div>
                            <input type="submit" className='btn btn-primary' value='Post'/>
                        </div>

                        {feedback?.length > 0 ? feedback.map((f,fId) => {
                            <div className="feedback" key={fId}>
                                {f.fullname}
                                {f.content}
                                {f.stars}
                            </div>
                        }) : 'No Reviews'}

                        {/* add feedback skeleton here */}
                    </div>

                    
                </div>

                <div className="similar-products">
                    <div className="similar-products-header">
                        <h3>Similar Products:</h3>
                    </div>
                    <div className="similar-products-main">
                        
                    </div>
                </div>
                {/* add loading skeletons for products  */}

                {/* add footer component here */}
            </div>
        </div>
    )
}

export default ProductPage;