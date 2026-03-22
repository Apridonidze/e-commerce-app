import axios from "axios"
import { useCookies } from "react-cookie"

import { useEffect, useState } from "react"

import { BACKEND_URL } from "../../config"

import Category from "../component/Category"
import Header from "../layout/Header"
import SupportChatContainer from "../component/SupportChatContainer"
import Sidebar from "../layout/Sidebar"
import Product from "../component/Product"
import StatusMessage from "../alerts/StatusMessage"

import Skeleton from "react-loading-skeleton" //relocate skeletons for folder

import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import EditProduct from "../admin/components/EditProduct"
import RemoveProduct from "../admin/components/RemoveProduct"

const Main = () => {

    const { prevProducts } = useContext(ProductContext)

    const [ cookies ] = useCookies(['token'])

    const [products, setProducts] = useState([])
    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, productId: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : false, productId: null})
    const [toggleSidebar, setToggleSidebar]= useState(false);
    
    const fetchProducts = async(offset, category) => {

        try{

            const product = await axios.get(`${BACKEND_URL}/api/product`, { params : {offset, category} })
            
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

    useEffect(() => {
        const toggles = ['setToggleEdit' , 'setToggleRemove', 'setToggleSidebar']
        // disable other toggles if one is active
    },[toggleEdit, toggleRemove , toggleSidebar])
    //cleanup
    
    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            {/* <StatusMessage /> */}

            {toggleEdit.status ? <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit}/> : <></> }
            {toggleRemove.status ? <RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove}/> : <></> }

            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " style={{minHeight : '100vh'}}>

                <Header setProducts={setProducts}/>
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