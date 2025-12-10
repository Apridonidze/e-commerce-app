import axios from 'axios'
import { useEffect, useState } from "react"


import User from "../component/User"
import MyProducts from '../component/MyProducts'
import CreateProduct from '../component/CreateProduct'


import {BACKEND_URL} from '../../config'
import { useCookies } from 'react-cookie'


const Dashboard = () => {

    const [ cookies ] = useCookies(['token'])

    const [toggleCreateProduct, setToggleCreateProduct] = useState(false)

    const [user,setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [saved , setSaved] = useState([])

    if(toggleCreateProduct){
        document.body.style.overflow = 'hidden';
    }else {
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        
        const fetchUser = async() => {
            try{

                await Promise.all([
                    await axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    await axios.get(`${BACKEND_URL}/products/my-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setProducts(resp.data.data)}),
                    await axios.get(`${BACKEND_URL}/products/saved-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setSaved(resp.data.productDetails)}),
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchUser();

    },[])

    //TODO : create component for saved products
    //TODO : create component for producfts created by me (make it updatable , delatable)
    //TODO : create chars for statistics
    return(
        <div className="dashboard-container">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" style={{zIndex : 1}}></div> <CreateProduct /></>}

            <User user={user}/>
            <MyProducts products={products} setToggleCreateProduct={setToggleCreateProduct}/>
        </div>
    )
}

export default Dashboard