import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header';
import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Product from '../components/product/Product';
import { useCookies } from 'react-cookie';
import { UserContext } from '../context/UserContext';
import FeedbackInput from '../components/feedback/FeedbackInput';

import EditProduct from '../admin/components/EditProduct';
import RemoveProduct from '../admin/components/RemoveProduct';
import ReportProduct from '../components/report/ReportProduct';
const ProductPage = () => {

    const [cookies] = useCookies(['token'])
    const { id } = useParams()

    const { user } = useContext(UserContext)

    const [product, setProduct] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isInCart, setIsInCart] = useState(false)
    const [inCartAmount, setInCartAmount] = useState(0);
    const [toggleFeedback, setToggleFeedback] = useState(false)
    const [amount, setAmount] = useState(0)

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : false, productId: null})
    const [toggleSidebar, setToggleSidebar]= useState(false);

    const [toggleMore, setToggleMore] = useState(false)

    const { cartIds } = useContext(UserContext)

    useEffect(() => {

        const fetchSimilarProducts = async (category, subcategory) => {
            console.log(category , subcategory)
            try {
                
                const res = await axios.get(`${BACKEND_URL}/api/product/similar-products`, {params: { category, subcategory, id }})
                setSimilarProducts(res.data.products || [])

            } catch (err) {
                console.log(err)
            }
        }


        const fetchProduct = async () => {
            try {

                const productRes = await axios.get(`${BACKEND_URL}/api/product/product-details`, {params: { id }})
                const feedbackRes = await axios.get(`${BACKEND_URL}/api/feedback/product-feedback/${id}`)

                const prod = productRes.data.product

                setProduct(prod)
                setFeedback(feedbackRes.data.feedback || [])

                if (prod) {
                    fetchSimilarProducts(prod.category, prod.subcategory)
                    setAmount(1)
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchProduct()

    }, [id])

    useEffect(() => {
        if (!product || !cartIds) return;

        const cartItem = cartIds.find(item => item.products_id === product.products_id);

        if (!cartItem) {
            setIsInCart(false);
            setInCartAmount(0);
        } else {
            setIsInCart(true);
            setInCartAmount(cartItem.amount);
        }

    }, [cartIds, product])
    
    let imagesArray = []
    
    try {   
        imagesArray = product?.images ? JSON.parse(product.images) : []
    } catch {
        imagesArray = []
    }

    const handleAddToCart = async (productId) => {
        try {

            await axios.post(`${BACKEND_URL}/api/cart/${productId}`,{ amount },{ headers: { Authorization: `Bearer ${cookies.token}` } })
            setIsInCart(true)
            setInCartAmount(amount)
            setAmount(0)

        } catch (err) {
            setIsInCart(false)
            setInCartAmount(0)
            setAmount(amount)
        }
    }

    const handleDeleteFromCart = async (productId) => {
        try {
            
            await axios.delete(`${BACKEND_URL}/api/cart/${productId}`,{ headers: { Authorization: `Bearer ${cookies.token}` } })
            setIsInCart(false)
            setAmount(0)
            setInCartAmount(0)
            
        } catch (err) {
            setIsInCart(true)
            setInCartAmount(inCartAmount)
            setAmount(0)
            console.log(err)
        }
    }

    return (
        <div className="main-container container-fluid row border">
            <div className="main-start col">
                <Sidebar />
            </div>

            <div className="main-end col">
                <Header />

                {toggleEdit.status ? <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit}/> : <></> }
                {toggleRemove.status ? <RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove}/> : <></> }

                {toggleFeedback && (
                    <div>
                        <div
                            className="feedback-bg bg-dark opacity-25 w-100 h-100"
                            onClick={() => setToggleFeedback(false)}
                            style={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        <FeedbackInput />
                    </div>
                )}

                {toggleAddToCart.status ? <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart}/> : <></>}
                {toggleReportProduct.status ? <ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct}/> : <></>}

                <div className="product-container row">
                    <div className="product-start col">
                        {imagesArray.map((img, index) => (
                            <img key={index} src={`data:image/jpeg;base64,${img}`} alt={`product-${index}`} style={{ maxWidth: '400px', height: 'auto' }}/>
                        ))}
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
                    </div>

                    <div className="product-end col">
                        <h4>{product?.title}</h4>
                        <h6>{product?.description}</h6>
                        <h6>{product?.category} / {product?.subcategory}</h6>
                        <h4>{product?.price} {product?.sales_price != null ? product?.sales_price : ''}</h4>
                        <h5>Available: {product?.amount} Pieces</h5>

                        <div className="d-flex flex-column gap-2">
                            <div>
                                <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev - 1 <= 0) return 0;return prev - 1})}>-</button>
                                <span>{isInCart ? inCartAmount : amount}</span>
                                <button disabled={isInCart ? true : false} onClick={() => setAmount(prev => { if(prev + 1 > product?.amount)return prev; return prev + 1})}>+</button>
                            </div>

                            {isInCart ? (<button onClick={() => handleDeleteFromCart(product.products_id)}>In Cart</button>) : (
                                amount === 0 ? (<button disabled>Add To Cart</button>) : (
                                    <button onClick={() => handleAddToCart(product.products_id)} disabled={cookies ? false : true}>Add To Cart</button>)
                            )}
                        </div>
                    </div>
                </div>

                <div className="feedback">
                    <div className="feedback-header">
                        <h3>{feedback.length} Product Review</h3>
                    </div>

                    <div className="feedback-main">
                        {cookies.token && (
                            <div className="feedback-input d-flex">
                                <div className="form-floating">
                                    <input type="text" onClick={() => setToggleFeedback(true)} className='form-control' id='fb-input'placeholder='Leave Your Feedback...'/>
                                    <label htmlFor="fb-input">Leave Your Feedback...</label>
                                </div>

                                <button onClick={() => setToggleFeedback(true)} className='btn btn-primary'>Post</button>
                            </div>
                        )}

                        <div className="feedback-footer d-flex flex-column">
                            {feedback.length > 0 ? (feedback.map((fb, i) => (<span key={i}>{fb.fullname} {fb.content} {fb.stars}</span>))
                            ) : 'No review'}
                        </div>
                    </div>
                </div>

                <div className="similar-products">
                    <h3>Similar Products:</h3>

                    <div className="similar-products-main">
                        {similarProducts.length > 0 ? (
                            similarProducts.map((prod, prodId) => (
                                <Product prod={prod} prodId={prodId} key={prodId} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct}/>))
                        ) : 'No Similar Products Found'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;