import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom"; //importing react libraries

import { useEffect, useState, useContext } from 'react'; //importing react hooks

import { UserContext } from '../context/UserContext'; //importing user contexnt
import { BACKEND_URL } from '../../config';//importing backend url from config file

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar'
import Footer from '../layout/Footer'; //importing layout components

import Product from '../components/product/Product';
import FeedbackInput from '../components/feedback/FeedbackInput'; //importing componenets

import EditProduct from '../admin/components/EditProduct';
import RemoveProduct from '../admin/components/RemoveProduct';
import ReportProduct from '../components/report/ReportProduct'; //importing toggable components

import '../styles/index.css'
import '../styles/products.css'; // importing css files

const ProductPage = () => {

    const { id } = useParams();
    const navigator = useNavigate();

    const [ cookies ] = useCookies(['token']);
    const { user, cartIds} = useContext(UserContext);

    const [product, setProduct] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [targetImage, setTargetImage] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isInCart, setIsInCart] = useState(false);
    const [inCartAmount, setInCartAmount] = useState(0);
    
    const [toggleMore, setToggleMore] = useState(false);
    const [toggleFeedback, setToggleFeedback] = useState(false);
    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : false, productId: null})
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const [isProductLoading , setIsProductLoading] = useState(true);
    const [isSimilarProductsLoading , setIsSimilarProductsLoading] = useState(true);//states to define loading state of components data

    let imagesArray = []; //defining array to store formatted imgs
    
    try {
        imagesArray = product?.images ? JSON.parse(product.images) : [] ; //pushing parsed products in imagesArray or parsing images and then passing to array
    } catch { //if parse could not happend then empty image array is given
        imagesArray = [];
    };

    useEffect(() => {

        const fetchSimilarProducts = async (category, subcategory) => { //fetching similar products based on category/subcategory params of current product
            try {
                const res = await axios.get(`${BACKEND_URL}/api/product/similar-products`, { params: { category, subcategory, id }}); //making api call and passign params
                setIsSimilarProductsLoading(false)
                setSimilarProducts(res.data.products || []); //setting similar products in state

            } catch (err) {
                setSimilarProducts([])
                setIsSimilarProductsLoading(false)
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            };
        };


        const fetchProduct = async () => { //fetchin prodcut data by given id params
            try {
                const productRes = await axios.get(`${BACKEND_URL}/api/product/product-details`, { params: { id } }); //fetching current product data
                const feedbackRes = await axios.get(`${BACKEND_URL}/api/feedback/product-feedback/${id}`); //fetching product feedbakcs by product id

                setIsProductLoading(false); //disabling loading state

                setProduct(productRes.data.product); //setting products in state
                setFeedback(feedbackRes.data.feedback || []); //setting feedbacks in state

                if (productRes.data.product) { //checcking if product is fetched and then calling fetchSimilarProducts function
                    fetchSimilarProducts(productRes.data.product.category, productRes.data.product.subcategory);
                    setAmount(1);
                };

            } catch (err) { //catching errors
                return navigator('/*' , {replace  : true}) ; //navigating user to not found page if product could not be fetched
            };
        };

        fetchProduct();//declearing function

    }, [id]); //logic executes on mount and id params change

    useEffect(() => {

        if (!product || !cartIds) return; //returning empty promise if cartId or product is undefined

        const cartItem = cartIds.find(item => item.products_id === product.products_id); //checking if item is in cartIds global state
        
        if (!cartItem) { //if product is not found in global state then 
            setIsInCart(false); //enabling add to cart button 
            setInCartAmount(0); //setting in cart amount to zero
        } else { //else (if product is in global state)
            setIsInCart(true); //disabling add to cart button and enabling remove from cart button
            setInCartAmount(cartItem.amount); //setting in cart amount based on global state given data
        };

    }, [cartIds, product]); //logic executes on mount and passed dependencies change
    
    const handleAddToCart = async (productId) => {
        try {

            const response = await axios.post(`${BACKEND_URL}/api/cart/${productId}`, { amount }, {headers: {Authorization: `Bearer ${cookies.token}`}}); //making api call
            
            setInCartAmount(amount); //updatin in cart amount state
            setIsInCart(true); //toggling in cart button
            setAmount(0); //setting amount to zero
            
            setToggleAlert({status: true, type: "Success", statusCode: response.status , message: response.data.message}); //toggling success message

        } catch (err) {
            
            setIsInCart(false);  //untoggling in cart button
            setInCartAmount(0); //setting in cart amount to zero
            setAmount(amount); //setting amount to default amount

            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling internal error message
        };
    };

    const handleDeleteFromCart = async (productId) => {
        try {
            
            const response = await axios.delete(`${BACKEND_URL}/api/cart/${productId}`,{headers: {Authorization: `Bearer ${cookies.token}`}});//making api call

            setIsInCart(false);//untogglgin in cart button
            setAmount(0);
            setInCartAmount(0);//setting amount states to zeros

            setToggleAlert({status: true, type: "Success", statusCode: response.status , message: response.data.message}); //toggling success message
            
        } catch (err) {
            
            setIsInCart(true); //toggling in cart button
            setInCartAmount(inCartAmount); //returning prev data of amount
            setAmount(0); //setting amount state to zero

            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling internal error message
        };
    };


    const getImageSrc = (img) => {//formatting images based on image type passed down to make images displayable

        if(!img) return; //returning empty promise if img is not provided

        if (typeof img === "string") return `data:image/jpeg;base64,${img}`; //returning image in base64 format
        return URL.createObjectURL(img);// else creating url for image if its type is not string

    };

    return (
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}>

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            {toggleEdit.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleEdit({status : false, product  :null})}></div> <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} setToggleAlert={setToggleAlert}/> </> : <></> }

            {toggleRemove.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleRemove({status : false, product  :null})}></div><RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove} setToggleAlert={setToggleAlert}/></> : <></> }

            {toggleReportProduct.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleReportProduct({status : false, productId  :null})}></div><ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct} setToggleAlert={setToggleAlert}/></> : <></>}
            
            {toggleAddToCart.status ? <div className="add-to-cart-wrapper" style={{top : `${window.scrollY}px`}}><div className="add-to-cart-background" style={{top : `${window.scrollY}px`}} onClick={() => setToggleAddToCart({status : false , product : null})}></div> <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart} setToggleAlert={setToggleAlert}/></div> : <></>}

           

            <div className="main-body">
                

                <div className="main-start"><Sidebar /></div>

                <div className="main-end">

                    <div className="main-header"><Header /></div>

 {!user ? <></> : 
                    <div className="more" style={{zIndex : 100, position : 'relative', bottom : '-3rem', right : '1rem'}}>

                        <div className="toggle-more border mt-1 rounded-2 " style={{ display : toggleMore ? 'flex' : 'none' , flexDirection: "column" ,position : "absolute" , right : '0.2rem' }}>
                            {user?.role == 'admin' ? 
                                <>

                                    <button className="btn text-primary d-flex align-items-center py-2 w-100 rounded-0" onClick={() => setToggleEdit({status : true , product : prod})}><i class="fa-regular fa-pen-to-square text-primary"></i> Edit</button>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100" onClick={() => setToggleRemove({status : true , product : prod})}><i class="fa-regular fa-trash-can text-danger"></i> Remove</button>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100 gap-2" onClick={() => setToggleReportProduct({status : true , reportDetails : prod})}><i class="fa-solid fa-flag text-danger"></i> Report</button>
                                </>
                            :
                                <>
                                    <button className="btn text-danger d-flex align-items-center py-2 w-100 gap-2" onClick={() => setToggleReportProduct({status : true , reportDetails : prod})}><i class="fa-solid fa-flag text-danger"></i> Report</button>
                                </>
                            }
                        </div>
                    </div>
                }

                    {toggleFeedback && <div> <div className="feedback-bg bg-dark opacity-25 w-100 h-100" onClick={() => setToggleFeedback(false)} style={{ position: 'absolute', left: 0, top: 0 }}/><FeedbackInput /></div>
                    }

                    {toggleAddToCart.status ? <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart}/> : <></>}
                    {toggleReportProduct.status ? <ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct}/> : <></>}

                    

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

                    
                    <div className="products-container" style={{minHeight : '80vh'}}>
                        <h3>Similar Products:</h3>

                            {similarProducts.length > 0 ? (
                                similarProducts.map((prod, prodId) => (
                                    <Product prod={prod} prodId={prodId} key={prodId} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct}/>))
                            ) : 'No Similar Products Found'}
                        
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ProductPage; //exporting component