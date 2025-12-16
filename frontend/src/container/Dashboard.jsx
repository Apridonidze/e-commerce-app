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
    


    return(
        <div className="dashboard-container container-fluid d-flex">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" onClick={() => {setToggleCreateProduct(false) ; document.body.classList.remove('overflow-hidden')}} style={{zIndex : 1}}></div> <CreateProduct /></>}
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User />
                <div className="cart-container border"><Cart/></div>
                <div className="saved-container border"><Saved /></div>
            </div>
        </div>
    )
}

export default Dashboard