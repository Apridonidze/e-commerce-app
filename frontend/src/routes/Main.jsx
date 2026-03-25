import axios from "axios";
import { BACKEND_URL } from "../../config";

import { useCookies } from "react-cookie";
import { useEffect, useState, useContext } from "react";

import { ProductContext } from "../context/ProductContext";

import Category from "../component/Category";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

import SupportChatContainer from "../component/SupportChatContainer";
import EditProduct from "../admin/components/EditProduct";
import Product from "../component/Product";
import RemoveProduct from "../admin/components/RemoveProduct";
import AddToCart from "../component/AddToCart";
import ReportProduct from "../component/ReportProduct";

import Skeleton from "react-loading-skeleton";
import StatusMessage from "../alerts/StatusMessage";

const Main = () => {

    const [ cookies ] = useCookies(['token']);
    const { prevProducts } = useContext(ProductContext);

    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [category, setCategory] = useState(null);

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : null, productId: null})
    const [toggleAlert, setToggleAlert] = useState({status : false , responseStatus : null, message : null});
    const [toggleSidebar, setToggleSidebar]= useState(false);
    
    const fetchProducts = async(offset, category) => {
        try{

            const product = await axios.get(`${BACKEND_URL}/api/product`, { params : {offset, category} })
            
            if(product.status === 204) setProducts([])
            setProducts(product.data.products)
        setToggleAlert({status : true , responseStatus : false, message : product.data.message})


        }catch(err){
            setToggleAlert({status : true , responseStatus : false, message : err.response.data.message})
            setProducts(prevProducts)
        }
    }
    
    useEffect(() => {

        setProducts(prevProducts)
        fetchProducts(offset,category);

        return () => {fetchProducts()}
    },[category, offset])

    
    
    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
                
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            {toggleSidebar ? <div><div className="sidebar-background"></div><Sidebar /></div>  : <></>}
            {toggleEdit.status ? <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit}/> : <></> }
            {toggleRemove.status ? <RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove}/> : <></> }
            {toggleAddToCart.status ? <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart}/> : <></>}
            {toggleReportProduct.status ? <ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct}/> : <></>}
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " style={{minHeight : '100vh'}}>

                <Header setProducts={setProducts} setToggleSidebar={setToggleSidebar}/>
                <Category setCategory={setCategory} category={category} setProducts={setProducts} fetchProducts={fetchProducts} offset={offset}/>

                <div className="products row">
                    {products?.length < 1 ? <h1>No Products In This Category.</h1> : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart}/>) || <Skeleton />}
                    {products?.length % 15 !== 0 || products?.length === 0 ? <></> : <button className="btn btn-warning" onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More...</button>}
                </div>
                
                {!cookies ? <></> : <SupportChatContainer />}
                
            </div>
        </div>
    )
}

export default Main