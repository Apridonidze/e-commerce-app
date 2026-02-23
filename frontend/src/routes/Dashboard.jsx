import { useEffect, useState } from "react"


import User from "../component/User"
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Cart from '../component/Cart'
import CardDetails from '../component/CardDetails'

import { useLocation } from 'react-router-dom'


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

import { STRIPE_PUBLIC_KEY } from '../../config'
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);



const Dashboard = () => {
    
    const { hash } = useLocation();

    const [toggleCard,setToggleCard] = useState(false)

    useEffect(() => {
        if (hash) {
        
            const el = document.querySelector(hash);
            if (el) {el.scrollIntoView({ behavior: "smooth" })}

        }
        return
    }, [hash]);

    return(
        <div className="dashboard-container container-fluid d-flex">
            
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User />
                
                <div className="row">
                    <div className="col"><h1>Card Details</h1></div>
                    <div className="col"><button onClick={() => setToggleCard(true)}>Add Cart</button></div>
                </div>

                {toggleCard ? <Elements stripe={stripePromise}><CardDetails /></Elements> : <></>}

                <section id='cart-items'><Cart /></section>
            </div>
        </div>
    )
}
// add edit/add cart button toggle based on if user has added card details previous 

export default Dashboard