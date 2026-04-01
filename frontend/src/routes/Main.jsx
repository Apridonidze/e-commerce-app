import axios from "axios"; //importing axios
import { BACKEND_URL } from "../../config";  //importing backend url from env file

import { useCookies } from "react-cookie"; //importing react library
import { useEffect, useState, useContext } from "react"; //importing react hooks

import { UserContext } from "../context/UserContext"; //importing user context
import { ProductContext } from "../context/ProductContext"; //importing products from context (to avoid api calls everytime user visits this route)

import Category from "../component/Category";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar"; //importing layout components

import SupportChatContainer from "../component/SupportChatContainer";
import EditProduct from "../admin/components/EditProduct";
import Product from "../component/Product";
import RemoveProduct from "../admin/components/RemoveProduct";
import AddToCart from "../component/AddToCart";
import ReportProduct from "../component/ReportProduct"; //importing components

import NoProduct from "../component/NoProduct";//importing notFound product component
import StatusMessage from "../alerts/StatusMessage"; //importing skeletons for loading and component to  dissplay messages (error, warning)
import ProductSkeleton from "../skeletons/ProductSkeleton"; //importing loading skeleton for products

import '../styles/products.css';
import '../styles/index.css'; //importing css files

const Main = () => {

    const { prevProducts } = useContext(ProductContext); //defining main products from context api
    const { user } = useContext(UserContext);//defining user data from context

    const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState(null);//states for product and its parameters
    const [dropDownIndex ,setDropDownIndex] = useState({id : null , category : null}); //state for category dropdowns

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : null, productId: null});
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : 0, message : ''}); //states to toggle components
    
    const fetchProducts = async(offset, category) => {
        try{

            setIsLoading(true)

            const product = await axios.get(`${BACKEND_URL}/api/product`, { params : {offset, category} }); //fetching products from backend on offsets or category changes
            
            if(product.status === 204) {setProducts([]); setIsLoading(false) ;return} //handing 204 status code
            setProducts(product.data.products); setIsLoading(false) //storing products in state if status code is 200

        }catch(err){ //catching error
            setIsLoading(false)
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            setProducts(prevProducts); //Setting pre-loaded products in state in case error occurs
        };
    };
    
    useEffect(() => {

        setProducts(prevProducts); //setting context provided products in products state
        fetchProducts(offset,category); //declearing funnction and passing offset, category arguments

        return () => fetchProducts(); //cleanup function to run function once on unmount

    },[category, offset]); //logic executes on first mount and after dependencies change

    return(
        <div className="main-container container-fluid"> 

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            {toggleEdit.status ? <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit}/> : <></> }
            {toggleRemove.status ? <RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove}/> : <></> }
            {toggleReportProduct.status ? <ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct}/> : <></>}
            
            {toggleAddToCart.status ? <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart}/> : <></>}

            <div className="main-start">
                <Sidebar /> 
            </div>
            <div className="main-end px-4">

                <Header setProducts={setProducts} setToggleAlert={setToggleAlert} />
                <Category setCategory={setCategory} category={category} fetchProducts={fetchProducts} offset={offset} setDropDownIndex={setDropDownIndex} dropDownIndex={dropDownIndex}/>

                <div className="products-container" style={{minHeight : '80vh'}}>
                    {!isLoading ? 
                        products?.length < 1 ? <NoProduct fetchProducts={fetchProducts} setCategory={setCategory} setDropDownIndex={setDropDownIndex} dropDownIndex={dropDownIndex}/>
                        : <div className="products">
                            {products?.map((prod,_) => <Product prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart} setToggleAlert={setToggleAlert}/>)}
                        </div> 
                    : [...Array(15)].map((_,i) => (<ProductSkeleton key={i}/>))}
                </div>
                
                {products?.length % 15 !== 0 || products?.length === 0 ? 
                    <></> : 
                <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More Items...</button>}
                
                {!user ||  user?.role == 'admin'  ? <></> : <SupportChatContainer setToggleAlert={setToggleAlert}/>}
                
            </div>
        </div>
    );
};

export default Main; //exporting route