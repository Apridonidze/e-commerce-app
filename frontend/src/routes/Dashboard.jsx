import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from "../layout/Footer"; //importing layout components

import User from "../components/dashboard/User";
import Cart from '../components/dashboard/Cart';
import Order from "../components/order/Order";
import OrderList from "../components/order/OrderList";
import Address from '../components/dashboard/Address';
import CardHolder from "../components/dashboard/CardHolder"
import CardDetails from '../components/dashboard/CardDetails'; //importing UI components

import ToggleAddress from '../components/dashboard/ToggleAddress';
import ChooseAddress from '../components/address/ChooseAddress'; //importing Toggable components

import StatusMessage from '../alerts/StatusMessage';
import SuccessPaymentMessage from '../alerts/SuccessPaymentMessage';
import FailedPaymentMessage from '../alerts/FailedPaymentMessage'; //importing popup messages

import UserSkeleton from '../skeletons/UserSkeleton';
import CardSkeleton from '../skeletons/CardSkeleton';
import OrderSkeleton from '../skeletons/OrderSkeleton'; //importing loading skeletons

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
    const [toggleAdd, setToggleAdd] = useState(false);
    const [toggleAddress, setToggleAddress] = useState(false);
    const [togglePayment,  setTogglePayment] = useState({status : false, success : false, orderId : null});
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const [orders,setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]); //states to stroe user details
    
    const [targetAddress, setTargetAddress] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); //state to store current orders details
    
    const [isLoading ,setIsLoading] = useState(true);
    const [isOrderLoading, setIsOrderLoading] = useState(true); //states to define if api is still loading data or not
    

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

    const handleDeleteFromCart = async(e) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            if(response.status === 200) { //hadning response success event
                setCartIds(cartIds.filter(c => c.product_id !== e)); //removing item from cartIds state
                setToggleAlert({status: true, type: "Success", statusCode: 200, message: "Product Removed From Cart Successfully"}); //toggling error message if customer intent could not be geneated
            };
            
        }catch(err){
            if(err.response?.status === 404) { //handling 404 status code
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: "Item Not Found In Your Cart"}); //toggling error message if customer intent could not be geneated
                setCartIds(cartIds); //setting cartIds state as default items
                return; //breaking action
            };

            // handling internal error event
            setCartIds(cartIds); //setting cartIds state as default items
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error if internal error occurs

        };
    };


    useEffect(() => {

        const fetchOrders = async() => {
            try{

                const orders = await axios.get(`${BACKEND_URL}/api/order`, {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call
                
                if(orders.status === 204) setOrders([]); //handling 204 status code
                if(orders.status === 200) setOrders(orders.data.orders); //handling 200 staus code
                
                return setIsOrderLoading(false); //setting isLoading state to false to let frontyend know that data fetching is finished

            }catch(err){
                setOrders([]); //setting orders state as empty array since no data  will be fetched if error occurs
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error if internal error occurs
                return setIsOrderLoading(false); //setting isLoading state to false to let frontyend know that data fetching is finished
            };
        };

        fetchOrders(); //declearing functions

    },[]); //logic triggers on component mount

    useEffect(() => {

        const fetchAddresses = async() => {
            try{

                const addresses = await axios.get(`${BACKEND_URL}/api/address`, {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call
        
                if(addresses.status === 204) setAddresses([]); //handling 204 status code
                if(addresses.status === 200) setAddresses(addresses.data.addresses); //handling 200 staus code

                return setIsLoading(false); //setting isLoading state to false to let frontyend know that data fetching is finished

            }catch(err){
                setAddresses([]);//setting empty array in state if internal error occurs
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
                setIsLoading(false); //setting isLoading state to false to let frontyend know that data fetching is finished
            };
        };

        fetchAddresses(); //declearing function

    },[]); //function triggers on every moount of Dashboard.jsx page 

    const removeAddress = async (id) => {

        try{
            const response = await axios.delete(`${BACKEND_URL}/api/address/${id}` , {headers : {Authorization : `Bearer ${cookies.token}`}});

            if(response.status === 200) {
                setAddresses(addresses.filter(address => address.id !== id))
                return setToggleAlert({status: true, type: "Success", statusCode: 200, message: response.data.message}); //toggling error message if customer intent could not be geneated
            }

        }catch(err){
            if(err.response?.status === 400)return setToggleAlert({status: true, type: "Fail", statusCode: 400, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
        };
    };

    const orderItems = async() => {
        
        let itemsIds = selectedItems?.map(prod => ({product_id: prod.id, amount : prod.amount, price : prod.sales_price ?? prod.price ?? 0})); //definng item short data from seleectedItems state and filtering them to check their prices 
        
        try{
            
            const order = await axios.post(`${BACKEND_URL}/api/order` , {itemsIds, targetAddress , totalPrice} , {headers : {Authorization : `Bearer ${cookies.token}`}}); //makiing api call to backend to create new order
            
            if(order.status === 200) { //handling 200 status code
                
                const items = selectedItems?.map(prod => prod.id);                
                const newCartIds = cartIds.filter(cart => items.some(id => id === cart.product_id)); // removeing selected items that ahas been ordered by user from cart state

                setCartIds(newCartIds);//setting updated cart ids into state 
                
                setToggleOrder(false);
                setToggleAdd(false);
                setToggleAddress(false); //untoggling order components
                
                setTogglePayment({status : true , success : true, orderId : order.data.orderId}); //toggling payment messages
                setOrders(prev => [...prev, {...addresses.filter(address => address.id == targetAddress), order_id : order.data.orderId, status : 'Pending', totalPrice , user_id : order.data.id , created_at : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}]); //updating orders instantly
            };

        }catch(err){

            if(err.status == 400){ //handling 400 status code error

                setToggleAddress(false); 
                setToggleAdd(false); //untoggling address components
                
                setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            };

            setToggleAddress(false);
            setToggleAdd(false); //untoggling address componnenets

            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            
        };
    };

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start" style={{maxWidth : '3000px'}}>

            {togglePayment.status ? <div className="bg" onClick={() => setTogglePayment({status : false, success : false , orderId : null})}> <div className="payment-message-background" onClick={(e) => e.stopPropagation()}>{togglePayment.success ? <SuccessPaymentMessage setTogglePayment={setTogglePayment} togglePayment={togglePayment}/> : <FailedPaymentMessage setTogglePayment={setTogglePayment} orderItems={orderItems}/> }</div> </div>  : <></>}
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            {toggleCard ? <div className="bg" onClick={() => setToggleCard(false)}><div className="card-details-background mx-auto"  onClick={(e) => e.stopPropagation()}><Elements stripe={stripePromise}><CardDetails toggleCard={toggleCard} setToggleCard={setToggleCard} setToggleAlert={setToggleAlert}/></Elements></div></div> : <></>}
            {toggleOrder && cardDetails?.last4 ? <div className="bg" onClick={() => setToggleOrder(false)}><div className="order-background m-auto rounded-2 mt-5 p-2"  onClick={(e) => e.stopPropagation()}><Order toggleOrder={toggleOrder} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setToggleOrder={setToggleOrder} cartIds={cartIds} handleDeleteFromCart={handleDeleteFromCart} setToggleAddress={setToggleAddress}/></div></div>  : <></>}

            {toggleAddress ? <div className="bg" onClick={() => setToggleAddress(false)}><div className="toggle-address-background mx-auto" onClick={(e) => e.stopPropagation()}><ChooseAddress setToggleAddress={setToggleAddress} orderItems={orderItems} targetAddress={targetAddress} setToggleAdd={setToggleAdd} removeAddress={removeAddress} addresses={addresses} isLoading={isLoading} setTargetAddress={setTargetAddress}/></div></div> : <></>}
            {toggleAdd ? <div className="bg" onClick={() => setToggleAdd(false)}><div className="toggle-address-background mx-auto" onClick={(e) => e.stopPropagation()}><ToggleAddress setAddresses={setAddresses} setToggleAdd={setToggleAdd} setToggleAlert={setToggleAlert} toggleAdd={toggleAdd} /></div></div> : <></>}
            
            <div className="main-body " >

                <div className="main-start"><Sidebar /></div>

                <div className="main-end">

                    <div className="main-header mb-3"><Header /></div>
                    
                    <div className="dashboard-container">

                        <div className="dashboard-start">
                            {!user ? <UserSkeleton /> : <User setToggleAlert={setToggleAlert} user={user}/>  } 
                            {!cardDetails ? <CardSkeleton /> : <CardHolder setToggleCard={setToggleCard} generateCustomerId={generateCustomerId} cardDetails={cardDetails}/> }
                            <Address setToggleAdd={setToggleAdd} removeAddress={removeAddress} addresses={addresses} isLoading={isLoading} setTargetAddress={setTargetAddress}/>
                        </div>

                        <div className="dashboard-end w-100 h-100">
                            <section id='cart-items'><Cart setToggleOrder={setToggleOrder} cartIds={cartIds} handleDeleteFromCart={handleDeleteFromCart}/></section>
                            <section id='order-list'>{isOrderLoading ? <OrderSkeleton /> : <OrderList orders={orders} setOrders={setOrders}/>}</section>
                        </div>

                    </div>
                    
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard; //exporting component