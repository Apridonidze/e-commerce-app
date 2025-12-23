import { useEffect, useState } from "react"
import Category from "../component/Category"
import Header from "../component/Header"
import Products from "../component/Products"
import Sidebar from "../component/Sidebar"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const Main = () => {

    const [ cookies ] = useCookies(['token'])

    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState(null);

    const fetchProducts = async(offset, category) => {
        try{

            await axios.get(`${BACKEND_URL}/products`, { params : {offset, category} ,headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        return () => {fetchProducts(0,category)}
    },[])

    //create another useeffect with offset ,category dependencies

    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col">
                <Sidebar /> 
            </div>
            <div className="main-end col">
                <Header />
                <Category setCategory={setCategory} category={category}/>

            </div>
        </div>
    )
}

export default Main