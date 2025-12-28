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

const Main = () => {

    const [ cookies ] = useCookies(['token'])

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);
    
    const [products, setProducts] = useState([])

    const [toggleChat, setToggleChat] = useState(false)

    const fetchProducts = async(offset, category) => {
        try{

            await axios.get(`${BACKEND_URL}/products`, { params : {offset, category} ,headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setProducts(prev => [...prev, ...resp.data.products])})

        }catch(err){
            console.log(err)
        }
    }

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
    
    useEffect(() => {
        return () => {fetchProducts(offset,category) ; fetchUser()}
    },[offset,category])

    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col " style={{minHeight : '100vh'}}>

                <Header setProducts={setProducts} fetchProducts={fetchProducts} offset={offset} category={category}/>
                <Category setCategory={setCategory} category={category} setProducts={setProducts} fetchProducts={fetchProducts} offset={offset}/>

                <div className="products row">
                    {products.length < 1 ? <h1>No Products In This Category.</h1> : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton />}
                    <button className="btn btn-warning" onClick={() => setOffset(prev => prev + 15)}>Load More...</button>
                </div>
                
                {/* {!cookies ? <></> : toggleChat ? <SupportChat /> : <></>} uncomment this line after testing/development is done */}
                {!cookies ? <></> : !toggleChat ? <SupportChat /> : <></> }
            </div>
        </div>
    )
}

export default Main