import axios from 'axios'
import { useEffect, useState } from "react"


import User from "../component/User"
import CreateProduct from '../component/CreateProduct'
import Saved from '../component/Saved'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'
import Cart from '../component/Cart'

import { BACKEND_URL } from '../../config'
import { useCookies } from 'react-cookie'


const Dashboard = () => {

    const [ cookies ] = useCookies(['token'])

    const [toggleCreateProduct, setToggleCreateProduct] = useState(false)

    const [user,setUser] = useState(null)
    useEffect(() => {
        
        const fetchUser = async() => {
            try{

                await Promise.all([
                    await axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                ])

            }catch(err){
                console.log(err)
            }
        }

        const isSaved = async() => {


        }

        return () => {fetchUser();isSaved();}

    },[cookies.token])


    const handleSave = async(e) => {
        
        try{

            await axios.post(`${BACKEND_URL}/products/saved-products/${e}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))
            
        }catch(err){
            console.log(err)
        }

    }


    const handleAddToCart = (e) => {
console.log(e)
    }

    return(
        <div className="dashboard-container container-fluid d-flex">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" onClick={() => {setToggleCreateProduct(false) ; document.body.classList.remove('overflow-hidden')}} style={{zIndex : 1}}></div> <CreateProduct /></>}
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User user={user}/>
                <div className="cart-container border"><Cart/></div>
                <div className="saved-container border"><Saved handleSave={handleSave} handleAddToCart={handleAddToCart} /></div>
            </div>
        </div>
    )
}

export default Dashboard