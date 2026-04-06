import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from "../layout/Footer"
import User from "../component/User";
import Cart from '../component/Cart';
import Order from "../component/Order"
import OrderList from "../component/OrderList"
import CardHolder from "../component/CardHolder"
import StatusMessage from '../alerts/StatusMessage';
import CardDetails from '../component/CardDetails'; //importing UI components

import { useContext, useEffect, useState } from "react"; ///importign react hooks

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; //importing stripe components

import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../context/UserContext"; //importing  user context
import { BACKEND_URL, STRIPE_PUBLIC_KEY } from '../../config'; //importing keys from config.jsx file

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY); //creating stripe promise


const Dashboard = () => {
    
    const { hash } = useLocation(); //defining hash from current url
    
    const [ cookies ] = useCookies(['token']); //defining user cookies
    const { user } = useContext(UserContext);
    const { cardDetails } = useContext(UserContext); //defining user data from user context
    
    const [cart , setCart] = useState([]);//state to store cart items
    
    const [toggleCard,setToggleCard] = useState(false);
    const [toggleOrder,setToggleOrder] = useState(false);
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    useEffect(() => {//scrolling user to sections if user chooses section from sidebar
        
        if(!hash) return; //returning empty promise if hash is not defiend from url
        
        const el = document.querySelector(hash);//definign section based on given hash
        if (el) {el.scrollIntoView({ behavior: "smooth" })}; //scrolling user to hash they provide
        
    }, [hash]);//triggering logic once hash is defined


    const generateCustomerId = async () => { //function to generate customer intent for stripe payments

        try{

            const GenerateCustomerId = await axios.post(`${BACKEND_URL}/api/stripe/create-customer-intent`, {email : user.email} , {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call to stripe third party apis
            if(GenerateCustomerId.status === 200)setToggleCard(true); //checking apis response and toggling card fillout component if customer internt in generated successfully and toggling fillout component
            
        }catch(err){
            
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            setToggleCard(false); //untoggling card details filloout component
        
        };
    };

    useEffect(() => {
        
        if (toggleOrder && !cardDetails?.last4) { //checking if user clicked on toggleOrder button and does not have card details filled out

            setToggleCard(true); //toggling card fillout comonent
            setToggleOrder(false); //disabling order component
            setToggleAlert({status: true, type: "Warning", statusCode: 200, message: "First Fill Out Card Details To Place An Order."}); //triggering alert message to provide user with warning importmation
        
        }

    }, [toggleOrder, cardDetails]); //triggering logic once these dependencies change

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start">
            
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            <div className="main-body " >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header mb-3"><Header /></div>
                    <User />
                    
                    <CardHolder setToggleCard={setToggleCard} generateCustomerId={generateCustomerId}/>

                    {toggleCard ? <div className="card-details-container bg-dark position-absolute w-100 h-100 start-0 top-0"><div className="card-details-background"></div><Elements stripe={stripePromise}><CardDetails /></Elements></div> : <></>}
                    {toggleOrder && cardDetails?.last4 ? <div><div className="bg-dark position-absolute w-100 h-100 start-0 top-0" onClick={() => setToggleOrder(false)}></div> <Order setCart={setCart} cart={cart}/></div>  : <></>}

                    <section id='cart-items'><Cart setToggleOrder={setToggleOrder} setCart={setCart} cart={cart}/></section>
                    <section id='order-list'><OrderList /></section>
                    
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard; //exporting component