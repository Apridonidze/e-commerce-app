import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom"; //importing react libraries

import { useEffect, useState, useContext } from 'react'; //importing react hooks

import { UserContext } from '../context/UserContext'; //importing user contexnt
import { BACKEND_URL } from '../../config';//importing backend url from config file

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar'
import Footer from '../layout/Footer'; //importing layout components

import StatusMessage from '../alerts/StatusMessage';
import Product from '../components/product/Product';

import AddToCart from '../components/product/AddToCart';
import EditProduct from '../admin/components/EditProduct';
import RemoveProduct from '../admin/components/RemoveProduct';
import ReportProduct from '../components/report/ReportProduct'; //importing toggable components

import '../styles/index.css'
import '../styles/products.css'; // importing css files

import ProductContainer from '../components/product/ProductContainer';
import FeedbackContainer from '../components/feedback/FeedbackContainer';

import ProductContainerSkeleton from '../skeletons/ProductContainerSkeleton'
import ProductPageSkeleton from '../skeletons/ProductPageSkeleton';
import ProductSkeleton from '../skeletons/ProductSkeleton';
import EmptySimilarProducts from '../empty/EmptySimilarProducts';

const ProductPage = () => {

    const { id } = useParams();
    const navigator = useNavigate();

    const [ cookies ] = useCookies(['token']);
    const { user, cartIds } = useContext(UserContext);

    const [product, setProduct] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [targetImage, setTargetImage] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isInCart, setIsInCart] = useState(false);
    const [inCartAmount, setInCartAmount] = useState(0);
    
    const [toggleMore, setToggleMore] = useState(false);
    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [feedbackData, setFeedbackData] = useState({star : null , content : null});
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

     const handlePostFeedback = async() => {
        try{

            const postFeedback = await axios.post(`${BACKEND_URL}/api/feedback/product-feedback/${id}` , feedbackData , {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            setFeedback(prev => [...prev, {id ,feedback_id : postFeedback.data.product_id, content : feedbackData.content , stars  : feedbackData.star, fullname : user?.fullname, type : 'product' , product_id  : id}])
            setFeedbackData({star : null, content : null})
            setToggleAlert({status: true, type: "Success", statusCode: postFeedback.status , message: postFeedback.data.message}); //toggling success message

        }catch(err){
            setFeedback(prev)
            setFeedbackData({star : null, content : null})
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling internal error message

        };
    };

    const removeFeedback = async(id) =>{ //api functionm to delete user feedback as admin
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/feedback/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}}); //making api call
            if(response.status === 200) setFeedback(prev => prev.filter((fb => fb.feedback_id !== id))) //handling 200 status code

        }catch(err){
            setFeedback(prev); //returning previous state if err occurs
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
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

                    <div className="products-page-row d-flex align-items-start gap-3">

                        <div className="products-page-col1">
                            {isProductLoading ? <ProductContainerSkeleton/> : <ProductContainer handleDeleteFromCart={handleDeleteFromCart} inCartAmount={inCartAmount} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove}setToggleReportProduct={setToggleReportProduct} handleAddToCart={handleAddToCart} user={user} setTargetImage={setTargetImage} amount={amount} setToggleMore={setToggleMore} getImageSrc={getImageSrc} toggleMore={toggleMore} imagesArray={imagesArray} targetImage={targetImage} product={product} setAmount={setAmount} isInCart={isInCart} toggleAddToCart={toggleAddToCart}/>}

                            <div className="similar-products-container d-flex flex-column gap-2 mt-5">
                                <h4 className='fw-bold' style={{color : '#10b981'}}>Similar Products:</h4>

                                {isSimilarProductsLoading ? <div className="products">{[...Array(5)].map((_,i) => (<ProductSkeleton key={i}/>))}</div> : similarProducts.length > 0 ? 
                                    <div className="products">
                                        {similarProducts.map(prod => (
                                            <Product prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart} setToggleAlert={setToggleAlert}/>
                                        ))}    
                                    </div>
                                : <EmptySimilarProducts />}
                            </div>
                        </div>
                        <div className="products-page-col2">  
                        {isProductLoading ? <ProductPageSkeleton />  : <FeedbackContainer user={user} removeFeedback={removeFeedback} handlePostFeedback={handlePostFeedback} feedbackData={feedbackData} setFeedbackData={setFeedbackData}  cookies={cookies} feedback={feedback}/>}
                        </div>
                      
                    </div>
                    
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ProductPage; //exporting component