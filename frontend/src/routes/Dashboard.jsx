import { useContext, useEffect, useState } from "react"

import User from "../component/User"
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Cart from '../component/Cart'
import CardDetails from '../component/CardDetails'

import { useLocation } from 'react-router-dom'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

import { BACKEND_URL, STRIPE_PUBLIC_KEY } from '../../config'
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { useCookies } from "react-cookie"
import CardHolder from "../component/CardHolder"
import Order from "../component/Order"
import OrderList from "../component/OrderList"

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);



const Dashboard = () => {
    
    const { hash } = useLocation();

    const [cookies] = useCookies(['token'])
    const [toggleCard,setToggleCard] = useState(false)

    const [toggleOrder,setToggleOrder] = useState(false)

    const { user } = useContext(UserContext)
    const { cardDetails } = useContext(UserContext)

    const [cart , setCart] = useState([])

    useEffect(() => {
        if (hash) {
        
            const el = document.querySelector(hash);
            if (el) {el.scrollIntoView({ behavior: "smooth" })}

        }
        return
    }, [hash]);

    const generateCustomerId = async () => {
        try{

            const GenerateCustomerId = await axios.post(`${BACKEND_URL}/api/stripe/create-customer-intent`, {email : user.email} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            if(GenerateCustomerId.status === 200){
                setToggleCard(true)
            } //toggle error + setToggleCard(false)
            
            
        }catch(err){
            console.log(err)
            // toggle alert message 
            setToggleCard(false)
        }
    }

    useEffect(() => {
    if (toggleOrder && !cardDetails?.last4) {
        setToggleCard(true);
        setToggleOrder(false);
        // toggle alert message
    }
    }, [toggleOrder, cardDetails]);

    return(
        <div className="dashboard-container container-fluid d-flex">
            
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User />
                
                <CardHolder setToggleCard={setToggleCard} generateCustomerId={generateCustomerId}/>

                {toggleCard ? <div className="card-details-container bg-dark position-absolute w-100 h-100 start-0 top-0"><div className="card-details-background"></div><Elements stripe={stripePromise}><CardDetails /></Elements></div> : <></>}
                {toggleOrder && cardDetails?.last4 ? <div><div className="bg-dark position-absolute w-100 h-100 start-0 top-0" onClick={() => setToggleOrder(false)}></div> <Order setCart={setCart} cart={cart}/></div>  : <></>}

                <section id='cart-items'><Cart setToggleOrder={setToggleOrder} setCart={setCart} cart={cart}/></section>
                <section id='order-list'><OrderList /></section>
                
            </div>
        </div>
    )
}

export default Dashboard