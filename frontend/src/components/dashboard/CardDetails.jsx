import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"; //importing stripe library and components

import { useContext, useEffect, useState, useRef } from "react"; //importing react hooks
import { UserContext } from "../../context/UserContext"; //importing user context

import { BACKEND_URL } from "../../../config"; //importing backend url from config file

const CardDetails = ({ toggleCard, setToggleCard, setToggleAlert}) => {

    const [ cookies ] = useCookies(['token']); //defining user cookies
    const { cardDetails } = useContext(UserContext); //defining user card context

    const stripe = useStripe();
    const elements = useElements(); //defining stripe elements variables

    const [cardState, setCardState] = useState({
        number: { complete: false, error: null },
        expiry: { complete: false, error: null },
        cvc: { complete: false, error: null }
    }); //state for stirpe element input

    const [alertText ,setAlertText] = useState(''); //state for small alert text at the bottom of component

    const numberRef = useRef(null);
    const expireRef = useRef(null);
    const cvcRef = useRef(null);
    const submitRef = useRef(null); //refs for CardDetails.jsx elements

    const handleSaveCard = async (e) => {
        
        e.preventDefault(); //preventing page reload on function tirgger
        submitRef.current.disabled = true; //disabling button after function is tirggered to avoid user spammnig requests to third party api 

        setAlertText('Card Details Processing. Do Not Close Window Yet!'); //setting alert message

        if(!numberRef && !numberRef.current && !expireRef && !expireRef.current && !cvcRef && !cvcRef.current) return; //returning empty promise if refs are undefined || null
        
        try{//triggering stripe card functions to save user card details
            
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: cardDetails.customer_id} , {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call 

            const cardNumber = elements.getElement(CardNumberElement); //defining card number from stripe elements
            const result = await stripe.confirmCardSetup(data.clientSecret, { payment_method: { card: cardNumber } }); //validating user card intent 

            setToggleAlert({status: true, type: "Success", statusCode:200, message: 'Card Details Saved Successfully!'}); //toggling success message
            setAlertText(''); //clearing small alert messasge

            const refs = [expireRef, numberRef, cvcRef]; //array of stripe element refs
            const errorCodes = [{code : 'incomplete_expiry', ref : expireRef} , {code : 'incomplete_number', ref: numberRef}, {code :'incomplete_cvc', ref : cvcRef}]; //array for stripe errro codes and targeted elements that cause eerror to style them based on response

            if (result.error) { //handling stripe errror messages
                
                errorCodes.forEach(err => { //mapping on errorCodes to check which stripe element caused errror
                    if(err.code == result.error.code){ //adding error state to element that caused stripe error
                        err.ref.current.classList.add('error');
                    }else { //else removing stripe error message if any other input does not cause eerrors
                        err.ref.current.classList.remove('error');
                    };
                });

                setAlertText(''); //clearing small alert messasge
                return submitRef.current.disabled = true; //disabling submit button if error is occured
            };
            
            setAlertText(''); //clearing small alert messasge
            refs.map(ref => {ref.current.classList.remove('error') ; ref.current.classList.add('success')}); //addding success states to valid stirpe element contents
            setTimeout(() => { setToggleCard(false) }, 3000); //disabling component after 3 seconds after successfully saving card details

        }catch(err){ //handling internal errors
            setAlertText(''); //clearing small alert messasge
            setToggleAlert({status: true, type: "Internal_Error", statusCode: 500, message: String(err.response?.data?.message || err.message || 'Provider Error')}); //triggerring 
        };
    };

    useEffect(() => { //handing page scrolling for bg and mian container aligmnet

        if (toggleCard) { //checking if toggleCard is true (if this component is mounted)
            document.documentElement.scrollTop = 0; //scrolling user at the very top of the page

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // hidding page overflow to prevent users from scrolling page when component is triggered
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = ''; //disabling overflow styling if component is not triggered
        }

        return () => {document.body.style.overflow = ''; document.documentElement.style.overflow = ''}; //cleanup function to remove styling after component unmounts

    }, [toggleCard]); //logic executes on toggleCard dependency change


    useEffect(() => {
        
        if(!numberRef?.current || !expireRef?.current || !cvcRef?.current || !submitRef?.current) return; //returning empty promise if refs are undefined

        const fields = [{ ref: numberRef, complete: cardState.number.complete },{ ref: expireRef, complete: cardState.expiry.complete },{ ref: cvcRef, complete: cardState.cvc.complete }]; //defining fields with refs and complete statuses to style them

        fields.forEach(({ ref, complete }) => ref.current.classList.toggle('success', complete)); //checking every filed and toggling success state if field input is valid
       
        const isFormComplete = fields.every(f => f.complete); //checking if every filed if valid
        submitRef.current.disabled = !isFormComplete; // disabling/enabling submit button baed on if every field is valid/invalid 

    },[cardState]); //logic executes on cardState dependency change

    const options = { //object to style base of stripe elements
        style: {
            base: {
                color: '#94a3b8',
                fontSize: '16px',
                '::placeholder': {color: '#94a3b8'},
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.5px',
                lineHeight: '1.5',
            },
            invalid: {
                color: '#dc3545',
            },
        },
    };

    return(
        <div className="card-details-container w-100 mt-5 p-3 rounded-2">

            <div className="card-details-top d-flex align-items-start gap-1 justify-content-between">
                <div className="card-details-top-start mb-4">
                    <h2>Payment Method</h2>
                    <span>Add secure card for your future purchases.</span>
                </div>
                <div className="card-details-top-end">
                    <div className="close-button ">
                    <button className="btn btn-none border-0" onClick={() => setToggleCard(false)}><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>

            <div className="card-details-main">
                <form onSubmit={handleSaveCard}>
                   <div className="stripe-cart-wrapper">

                        <div className={`stripe-input-group ${cardState.number.complete ? 'success' : 'fail'}`} ref={numberRef}>
                            <label htmlFor="card-number">* Card Number</label>
                            <div className="stripe-input-wrapper" id="card-number" >
                            <CardNumberElement  options={options} onChange={(e) => {setCardState(prev => ({...prev, number: {complete : e.complete, error : e.error}}))}}/>
                            </div>
                        </div>

                        <div className="stripe-cart-row d-flex align-items-center borders" ref={expireRef}>
                            <div className={`stripe-input-group flex-fill me-2 ${cardState.expiry.complete ? 'success' : 'fail'}`}>
                                <label htmlFor="card-expiry">* Expiry</label>
                                <div className="stripe-input-wrapper" id="card-expiry" >
                                    <CardExpiryElement options={options} onChange={(e) => {setCardState(prev => ({...prev, expiry: {complete : e.complete, error : e.error}}))}}/>
                                </div>  
                            </div>

                            <div className={`stripe-input-group flex-fill ${cardState.cvc.complete ? 'success' : 'fail'}`} ref={cvcRef} >
                                <label htmlFor="card-cvc">* CVC</label>
                                <div className="stripe-input-wrapper" id="card-cvc" >
                                    <CardCvcElement  options={options} onChange={(e) => {setCardState(prev => ({...prev, cvc: {complete : e.complete, error : e.error}}))}}/>
                                </div>
                            </div>
                        </div>

                        </div>

                    <div className="card-details-buttons mt-3 d-flex flex-column">
                        <button className="cardSaveBtn btn text-white fw-medium border-none" type="submit" ref={submitRef}>Save Details</button>   
                        <button className="btn btn-none fw-medium mt-2" onClick={() => setToggleCard(false)}>Cancle</button>
                        
                        <span style={{height: '35px'}}>
                                {alertText !== '' ? <span className="mt-3 text-center d-flex align-items-center gap-2 justify-contents-center mx-auto" style={{fontSize : '12px'}}>
                                <div className="dots-loader"><span></span><span></span><span></span></div>    
                                {alertText}
                            </span>  : <></>}
                        </span>

                    </div> 
                </form>
            </div>
        </div>
    );
};


export default CardDetails; //exporting component