import axios from "axios"; //importing axios
import { BACKEND_URL } from "../../config";  //importing backend url from env file

import { useEffect, useState, useContext } from "react"; //importing react hooks

import { UserContext } from "../context/UserContext"; //importing user context
import { ProductContext } from "../context/ProductContext"; //importing products from context (to avoid api calls everytime user visits this route)

import Category from "../component/Category";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
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

import '../styles/layout.css'
import '../styles/products.css';
import '../styles/index.css'; //importing css files

const Sales = () => {

    const { prevProducts } = useContext(ProductContext)
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

    const fetchProducts = async(offset, category) => {

        try{

            const product = await axios.get(`${BACKEND_URL}/api/product/sales-products`, { params : {offset, category} })
            
            if(product.status === 204) setProducts([])
            setProducts(product.data.products)

        }catch(err){
            setProducts(prevProducts)
            console.log(err)
            //toggle allert message and pass errors
        }
    }
    
    useEffect(() => {

        setProducts(prevProducts)
        fetchProducts(offset,category);

        return () => {fetchProducts()}
    },[category, offset])
    
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
    )
}

export default Sales