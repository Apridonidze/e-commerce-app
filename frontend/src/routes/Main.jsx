import axios from "axios"; //importing axios
import { BACKEND_URL } from "../../config";  //importing backend url from env file

import { useCookies } from "react-cookie"; //importing react library
import { useEffect, useState, useContext } from "react"; //importing react hooks

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

import Skeleton from "react-loading-skeleton";
import StatusMessage from "../alerts/StatusMessage"; //importing skeletons for loading and component to  dissplay messages (error, warning)

import '../styles/products.css'
import '../styles/index.css'
const Main = () => {

    const [ cookies ] = useCookies(['token']); //defining cookies
    const { prevProducts } = useContext(ProductContext); //defining main products from context api

    const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState(null);//states for product and its parameters

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : null, productId: null});
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : 0, message : ''});
    
    const fetchProducts = async(offset, category) => {
        try{

            setIsLoading(true)

            const product = await axios.get(`${BACKEND_URL}/api/product`, { params : {offset, category} }); //fetching products from backend on offsets or category changes
            
            if(product.status === 204) {setProducts([]); setIsLoading(false) ;return} //handing 204 status code
            setProducts(product.data.products); setIsLoading(false) //storing products in state if status code is 200

        }catch(err){ //catching error
            console.log(err)
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
            <div className="main-end border" >

                <Header setProducts={setProducts} />
                <Category setCategory={setCategory} category={category} fetchProducts={fetchProducts} offset={offset}/>

                <div className="products">
                    {!isLoading ? 
                        products?.length < 1 ? <h1>No Products In This Category.</h1> 
                        : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart}/>) 
                    : <Skeleton />}

                    {products?.length % 15 !== 0 || products?.length === 0 ? <></> : <button className="btn btn-warning" onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More...</button>}
                </div>
                
                {!cookies ? <></> : <SupportChatContainer />}
                
            </div>
        </div>
    );
};

export default Main; //exporting route