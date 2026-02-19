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

const Main = () => {

    const [ cookies, setCookies, removeCookies ] = useCookies(['token'])

    const [products, setProducts] = useState([])
    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);
    const [cartIds , setCartIds] = useState([])

    //do noot decleare some functions that require autohrization if user does not have cookeis

    useEffect(() => {

        const fetchUser = async() => {

            if(!cookies.token) return; 

            try{

                const user = await axios.get(`${BACKEND_URL}/api/auth/me` , {headers : {Authorization : `Bearer ${cookies.token}`}});
                
                if(user.status === 404)return removeCookies(cookies.token , {path : '/'})

                try{

                    const cartIds = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})
           
                    if(cartIds.status === 204){setCartIds([]); return}
                
                    const cartResp = cartIds.data.products              
                    const mappedCartIds = cartResp.map((id) => {return id.product_id})
            
                    setCartIds(mappedCartIds)

                }catch(err){
                    setCartIds([]);
                    console.log(err);
                    //add alert heere
                }

                return;

            }catch(err){
                console.log(err)
                //add alert here
            }
        }

        return () => {fetchUser()}

    }, []);
    
    const fetchProducts = async(offset, category) => {

        try{

            const product = await axios.get(`${BACKEND_URL}/api/product`, { params : {offset, category} })
            
            if(product.status === 204) setProducts([])
            setProducts(product.data.products)

        }catch(err){
            setProducts([])
            console.log(err)
            //toggle allert message and pass errors
        }
    }
    
    useEffect(() => {

        fetchProducts(offset,category);

        return () => {fetchProducts()}
    },[category, offset])

    //cleanup
    
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