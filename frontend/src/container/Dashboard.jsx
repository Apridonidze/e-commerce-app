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
import { useLocation } from 'react-router-dom'


const Dashboard = () => {

    const [ cookies ] = useCookies(['token'])
    const [toggleCreateProduct, setToggleCreateProduct] = useState(false)
    
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
        
            const el = document.querySelector(hash);
            if (el) {el.scrollIntoView({ behavior: "smooth" })}

        }
        return
    }, [hash]);

    return(
        <div className="dashboard-container container-fluid d-flex">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" onClick={() => {setToggleCreateProduct(false) ; document.body.classList.remove('overflow-hidden')}} style={{zIndex : 1}}></div> <CreateProduct /></>}
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User />
                <section id='cart-items'><Cart /></section>
                <section id='saved-items'><Saved /></section>
            </div>
        </div>
    )
}

export default Dashboard