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
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);



const Dashboard = () => {
    
    const { hash } = useLocation();

    const [cookies] = useCookies(['token'])
    const [toggleCard,setToggleCard] = useState(false)

    const { cardDetails } = useContext(UserContext)
    const { user } = useContext(UserContext)

    console.log(cardDetails)

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

            console.log(GenerateCustomerId)
            // GenerateCustomerId.data.stripe_customer_id
            // setToggleCard(true)

        }catch(err){
            console.log(err)

            // setToggleCard(false)
        }
    }
    
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
                    <div className="col">{<button onClick={() => {cardDetails?.customer_id ? setToggleCard(true) :  generateCustomerId()}}>{cardDetails?.last4 ? 'Edit Card' : 'Add Card'}</button>}</div>
                </div>

                {toggleCard ? <div className="card-details-container bg-dark position-absolute w-100 h-100 start-0 top-0"><div className="card-details-background"></div><Elements stripe={stripePromise}><CardDetails /></Elements></div> : <></>}

                <section id='cart-items'><Cart /></section>
            </div>
        </div>
    )
}
// add edit/add cart button toggle based on if user has added card details previous 

export default Dashboard