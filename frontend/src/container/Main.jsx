import { useEffect, useState } from "react"
import Category from "../component/Category"
import Header from "../component/Header"
import SupportChatContainer from "../component/SupportChatContainer"
import Sidebar from "../component/Sidebar"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Product from "../component/Product"
import Skeleton from "react-loading-skeleton"
import StatusMessage from "../alerts/StatusMessage"
// cleanup this section

const Main = () => {

    const [ cookies ] = useCookies(['token'])

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);
    
    const [products, setProducts] = useState([])

    const [toggleChat, setToggleChat] = useState(false)

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

                const cartIds = await axios.get(`${BACKEND_URL}/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})

           
                if(cartIds.status === 204){
                    setCartIds([]);
                    return
                }

            
                const cartResp = cartIds.data.products

              
                const mappedCartIds = cartResp.map((id) => {return id.product_id})

           
                setCartIds(mappedCartIds)

            }catch(err){

             
                setCartIds([]);
                console.log(err)
            }
        }

        return () => {fetchProductsData (); fetchUser()}

    }, []);
    
    // cleanup section before return and maybe refactor if possible
    //add error messages to api fetching functions for 500, 400, 204 status codes

    
    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <StatusMessage />
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " style={{minHeight : '100vh'}}>

                <Header />
                <Category setCategory={setCategory} category={category} setProducts={setProducts} fetchProducts={fetchProducts} offset={offset}/>

                <div className="products row">
                    {products?.length < 1 ? <h1>No Products In This Category.</h1> : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId}  cartIds={cartIds} setCartIds={setCartIds}/>) || <Skeleton />}
                    <button className="btn btn-warning" onClick={() => setOffset((prev) => {if(products.length % 15 === 0){return prev + 15} return})}>Load More...</button>
                </div>
                
                {!cookies ? <></> : <SupportChatContainer />}
                
            </div>
        </div>
    )
}   

export default Main