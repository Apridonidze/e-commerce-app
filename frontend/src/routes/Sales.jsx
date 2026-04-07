import axios from "axios"; //importing axios
import { BACKEND_URL } from "../../config";  //importing backend url from env file

import { useEffect, useState, useContext } from "react"; //importing react hooks

import { UserContext } from "../context/UserContext"; //importing user context

import Category from "../layout/Category";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar"; //importing layout components

import SupportChatContainer from '../components/supportchat/SupportChatContainer'
import EditProduct from "../admin/components/EditProduct";
import Product from "../components/product/Product";
import RemoveProduct from "../admin/components/RemoveProduct";
import AddToCart from "../components/product/AddToCart";
import ReportProduct from "../components/report/ReportProduct"; //importing components

import NoProduct from "../empty/NoProduct";//importing notFound product component
import StatusMessage from "../alerts/StatusMessage"; //importing skeletons for loading and component to  dissplay messages (error, warning)
import ProductSkeleton from "../skeletons/ProductSkeleton"; //importing loading skeleton for products

import '../styles/layout.css'
import '../styles/products.css';
import '../styles/index.css'; //importing css files

const Sales = () => {

    const { user } = useContext(UserContext);//defining user data from context


   const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState(null);//states for product and its parameters
    const [dropDownIndex ,setDropDownIndex] = useState({id : null , category : null}); //state for category dropdowns

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, product: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : null, productId: null});
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const fetchProducts = async(offset, category) => { //fecthing products on sale 

        try{

            setIsLoading(true); //updating state to true to load LoadingSkeleton

            const product = await axios.get(`${BACKEND_URL}/api/product/sales-products`, { params : {offset, category} }); //making api call and passing params
            
            if(product.status === 204) setProducts([]);
            if(product.status === 200) setProducts(product.data.products); //handling response status codes

            setIsLoading(false); //updating state to remove loading skeleton

        }catch(err){ //catching error messages
            setIsLoading(false); //updating state to remove loading skeleton
            setProducts(products); //setting old products in state
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            //toggle allert message and pass errors
        };
    };
    
    useEffect(() => {

        setProducts(products); //setting procducts in state by default
        fetchProducts(offset,category); //calling function to fetch products

        return () => {fetchProducts()}
    },[category, offset]); //declearing fetchProducts function on dependencies change
    
    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start" style={{maxWidth : '3000px'}}>
            
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            {toggleEdit.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleEdit({status : false, product  :null})}></div> <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} setToggleAlert={setToggleAlert}/> </> : <></> }
            {toggleRemove.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleRemove({status : false, product  :null})}></div><RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove} setToggleAlert={setToggleAlert}/></> : <></> }
            {toggleReportProduct.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleReportProduct({status : false, productId  :null})}></div><ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct} setToggleAlert={setToggleAlert}/></> : <></>}
            
            {toggleAddToCart.status ? <div className="add-to-cart-wrapper" style={{top : `${window.scrollY}px`}}><div className="add-to-cart-background" style={{top : `${window.scrollY}px`}} onClick={() => setToggleAddToCart({status : false , product : null})}></div> <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart} setToggleAlert={setToggleAlert}/></div> : <></>}

            <div className="main-body " >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header">
                        <Header setProducts={setProducts} setToggleAlert={setToggleAlert} fetchProducts={fetchProducts}/>
                        <Category setCategory={setCategory} category={category} offset={offset} setDropDownIndex={setDropDownIndex} dropDownIndex={dropDownIndex}/>
                    </div>
                    
                    <div className="products-container" style={{minHeight : '80vh'}}>
                        {!isLoading ? 
                            products?.length < 1 ? <NoProduct  setCategory={setCategory} setDropDownIndex={setDropDownIndex} dropDownIndex={dropDownIndex}/>
                            : <div className="products">
                                {products?.map((prod) => <Product prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart} setToggleAlert={setToggleAlert}/>)}
                            </div> 
                        : <div className="products">{[...Array(15)].map((_,i) => (<ProductSkeleton key={i}/>))}</div> }
                    </div>
                    
                    {products?.length % 15 !== 0 || products?.length === 0 ? 
                        <></> : 
                    <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More Items...</button>}
                    
                    {!user ||  user?.role !== 'admin'  ? <></> : <SupportChatContainer setToggleAlert={setToggleAlert}/>}
                    
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Sales; //exporting component