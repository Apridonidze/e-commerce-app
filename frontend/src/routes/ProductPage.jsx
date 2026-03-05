import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Product from '../component/Product';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
const ProductPage = () => {

    const [cookies] = useCookies(['token'])

    const { id } = useParams()

    const [product,setProduct] = useState();
    const [feedback, setFeedback] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isInCart , setIsInCart] = useState(false)

    const { cartIds } = useContext(UserContext)

    useEffect(() => {

        const fetchProduct = async() => {

            try{

                const product = await axios.get(`${BACKEND_URL}/api/product/product-details`, {params : {id : id}})
                const feedback = await axios.get(`${BACKEND_URL}/api/feedback/product-feedback/${id}`)
                
                setProduct(product.data.product)
                setFeedback(feedback.data.feedback)

                fetchSimilarProducts(product.data.product.category, product.data.product.subcategory)

            }catch(err){
                console.log(err)
                // add erorr handling here based on statuses 500, 400 and 204 , 404
            }
        }

        const fetchSimilarProducts = async (category,subcategory) => {
            try{

                //add checking responses

                const products = await axios.get(`${BACKEND_URL}/api/product/similar-products`, {params : {category : category , subcategory : subcategory , id : id}})
                console.log(products.data.products) //remove    
                setSimilarProducts(products.data.products)

            }catch(err){
                // add erorr handling here based on statuses 500, 400 and 204 , 404
                console.log(err)
            }
        }

        if(cartIds.includes(product?.products_id)) setIsInCart(true)
        setIsInCart(false)

        return () => {fetchProduct()}

    },[id])
    
    const imagesArray = product && JSON.parse(product.images)

    const handleFeedback = () => {

    }

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
                            {isInCart ? <button onClick={() => handleDeleteFromCart(product.products_id)}>In Cart</button> : <button onClick={() => handleAddToCart(product.products_id)}>Add To Cart</button>}
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
                            <button onClick={() => handleFeedback()} className='btn btn-primary'>Post</button>
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
                        {similarProducts.length !== 0 ? similarProducts?.map((prod, prodId) => (
                            <Product prod={prod} prodId={prodId} key={prodId} savedIds={savedIds} cartIds={cartIds}/>
                        )) : 'No Similar Products Found'}
                    </div>
                </div>
                {/* add loading skeletons for products  */}

                {/* add footer component here */}
            </div>
        </div>
    )
}

export default ProductPage;