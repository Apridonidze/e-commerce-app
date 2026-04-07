import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from "../layout/Footer"
import User from "../components/dashboard/User";
import Cart from '../components/dashboard/Cart';
import Order from "../components/order/Order"
import OrderList from "../components/order/OrderList"
import CardHolder from "../components/dashboard/CardHolder"
import StatusMessage from '../alerts/StatusMessage';
import CardDetails from '../components/dashboard/CardDetails'; //importing UI components

import { useContext, useEffect, useState } from "react"; ///importign react hooks

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; //importing stripe components

import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie"; //importing react libraries

import { UserContext } from "../context/UserContext"; //importing  user context
import { BACKEND_URL, STRIPE_PUBLIC_KEY } from '../../config'; //importing keys from config.jsx file

import '../styles/dashboard.css'; //importing css file

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY); //creating stripe promise


const Dashboard = () => {
    
    const { hash } = useLocation(); //defining hash from current url
    
    const [ cookies ] = useCookies(['token']); //defining user cookies
    const { user , cardDetails , cartIds, setCartIds } = useContext(UserContext); //defining user data from user context
    
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
            
            {toggleCard ? <div className="bg cursor" onClick={() => setToggleCard(false)}><div className="card-details-background"></div><Elements stripe={stripePromise}><CardDetails /></Elements></div> : <></>}
            {toggleOrder && cardDetails?.last4 ? <div><div className="bg" onClick={() => setToggleOrder(false)}></div> <Order setCartIds={setCartIds} cartIds={cartIds}/></div>  : <></>}
            
            <div className="main-body " >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header mb-3"><Header /></div>
                    
                    <div className="dashboard-container">

                        <div className="dashboard-start">
                            {!user ? 'loadingg' : <User setToggleAlert={setToggleAlert}/>  } {/* add user skeleton here */}
                            {!cardDetails ? 'loading' : <CardHolder setToggleCard={setToggleCard} generateCustomerId={generateCustomerId} cardDetails={cardDetails}/> }{/* add cardholder loading */}
                        </div>

                        <div className="dashboard-end w-100 h-100">
                            {/* add loading skeleton here  .load cart when cartIds is defined*/}
                            <section id='cart-items'><Cart setToggleAlert={setToggleAlert} setToggleOrder={setToggleOrder} cartIds={cartIds} setCartIds={setCartIds}/></section>
                            <section id='order-list'><OrderList /></section>
                        </div>

                    </div>
                    
                </div>
            </div>

            <Footer />
        </div>
    );
};

// create loading sjkeletons for selected components

export default Dashboard; //exporting component