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

const Main = () => {

    const [ cookies ] = useCookies(['token'])

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);
    
    const [products, setProducts] = useState([])

    const fetchProducts = async(offset, category) => {
        try{

            await axios.get(`${BACKEND_URL}/products`, { params : {offset, category} ,headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setProducts(prev => [...prev, ...resp.data.products])})

        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        return () => {fetchProducts(offset,category)}
    },[offset,category])

    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col">
                <Header setProducts={setProducts} fetchProducts={fetchProducts}/>
                <Category setCategory={setCategory} category={category} setProducts={setProducts}/>
                <div className="products row">
                    {products.length < 1 ? <h1>No Products In This Category.</h1> : products?.map((prod,prodId) => <Product prod={prod} prodId={prodId} key={prodId}/>) || <Skeleton />}
                    <button className="btn btn-warning" onClick={() => setOffset(prev => prev + 15)}>Load More...</button>
                </div>
            </div>
        </div>
    )
}

export default Main