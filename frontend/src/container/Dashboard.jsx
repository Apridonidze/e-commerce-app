import axios from 'axios'
import { useEffect, useState } from "react"


import User from "../component/User"
import MyProducts from '../component/MyProducts'
import CreateProduct from '../component/CreateProduct'
import Saved from '../component/Saved'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'

import {BACKEND_URL} from '../../config'
import { useCookies } from 'react-cookie'


const Dashboard = () => {

    const [ cookies ] = useCookies(['token'])

    const [toggleCreateProduct, setToggleCreateProduct] = useState(false)

    const [user,setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [saved , setSaved] = useState([])

    

    useEffect(() => {
        
        const fetchUser = async() => {
            try{

                await Promise.all([
                    await axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    await axios.get(`${BACKEND_URL}/products/my-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setProducts(resp.data.data)}),
                    await axios.get(`${BACKEND_URL}/products/saved-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setSaved(resp.data.saved_products)}),
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchUser();

    },[cookies.token])


    return(
        <div className="dashboard-container container-fluid d-flex">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" onClick={() => {setToggleCreateProduct(false) ; document.body.classList.remove('overflow-hidden')}} style={{zIndex : 1}}></div> <CreateProduct /></>}
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User user={user}/>
                <MyProducts products={products} setToggleCreateProduct={setToggleCreateProduct}/>
                <Saved />
            </div>
        </div>
    )
}

export default Dashboard