import { useEffect, useState } from "react"
import Category from "../component/Category"
import Header from "../component/Header"
import Products from "../component/Products"
import Sidebar from "../component/Sidebar"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Product from "../component/Product"
import Skeleton from "react-loading-skeleton"
import SupportChat from "../component/SupportChat"

// cleanup this section

const Main = () => {

    const [ cookies ] = useCookies(['token'])

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);
    
    const [products, setProducts] = useState([])

    const [toggleChat, setToggleChat] = useState(false)

    const [savedIds , setSavedIds] = useState([])
    const [cartIds , setCartIds] = useState([])

    const fetchProducts = async(offset, category) => {
        try{

            const resp = await axios.get(`${BACKEND_URL}/products`, { params : {offset, category} ,headers : {Authorization : `Bearer ${cookies.token}`}})
            setProducts(resp.data.products)

        }catch(err){
            console.log(err)
        }
    }

    


   
    
    useEffect(() => {

        fetchProducts(offset,category);

        return () => {fetchProducts()}
    },[category, offset])


    useEffect(() => {

        const fetchUser = async() => {
        try{
            await Promise.all([
                axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setToggleChat(true)}),
                axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setToggleChat(false)})
            ])
        }catch(err){
            console.log(err)
            setToggleChat(false)
        }
    }
        

         const fetchProductsData = async () => {
        try{

            const savedIds = await axios.get(`${BACKEND_URL}/products/saved-products`, {headers : {Authorization : `Bearer ${cookies.token}`}})
            const cartIds = await axios.get(`${BACKEND_URL}/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})

            const savedResp = savedIds.data.products
            const cartResp = cartIds.data.products

            const mappedSaveIds = savedResp.map((id) => {return id.product_id})
            const mappedCartIds = cartResp.map((id) => {return id.product_id})

            setSavedIds(mappedSaveIds)
            setCartIds(mappedCartIds)


        }catch(err){
            console.log(err)
        }
    } 

        return () => {fetchProductsData (); fetchUser()}

    }, []);
    
    // cleanup section before return and maybe refactor if possible
    //add error messages to api fetching functions for 500, 400, 204 status codes

    
    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " style={{minHeight : '100vh'}}>

                <Header />
                <Category setCategory={setCategory} category={category} setProducts={setProducts} fetchProducts={fetchProducts} offset={offset}/>

                <div className="products row">
                    {products?.length < 1 ? <h1>No Products In This Category.</h1> : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId} savedIds={savedIds} cartIds={cartIds}/>) || <Skeleton />}
                    <button className="btn btn-warning" onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More...</button>
                </div>
                
                {/* add btn here that toggles support chat */}
                {/* {!cookies ? <></> : toggleChat ? <SupportChat /> : <></>} uncomment this line after testing/development is done, if the toggleChat is false then return component that just says support chat to untoggle component */}
                {!cookies ? <></> : !toggleChat ? <SupportChat /> : <></> }
            </div>
        </div>
    )
}   

export default Main