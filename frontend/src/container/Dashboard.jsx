import axios from 'axios'
import { useEffect, useState } from "react"


import User from "../component/User"
import CreateProduct from '../component/CreateProduct'
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

    const [cartIds, setCartIds] = useState([])

    useEffect(() => {
        if (hash) {
        
            const el = document.querySelector(hash);
            if (el) {el.scrollIntoView({ behavior: "smooth" })}

        }
        return
    }, [hash]);


    useEffect(() => {

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

                

                console.log(err)
            }
        }
        
        return () => fetchProductsData()

    },[])

    return(
        <div className="dashboard-container container-fluid d-flex">

            {toggleCreateProduct && <><div className="create-prodcut-bg position-fixed w-100 h-100 bg-dark opacity-50" onClick={() => {setToggleCreateProduct(false) ; document.body.classList.remove('overflow-hidden')}} style={{zIndex : 1}}></div> <CreateProduct /></>}
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <User />
                <section id='cart-items'><Cart cartIds={cartIds} /></section>
            </div>
        </div>
    )
}

export default Dashboard