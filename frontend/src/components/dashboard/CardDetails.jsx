import axios from "axios";
import { CardElement,CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../../config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { useRef } from "react";

const CardDetails = ({ toggleCard, setToggleCard, setToggleAlert}) => {

    const [ cookies ] = useCookies(['token'])

    const stripe = useStripe();
    const elements = useElements();

    const { cardDetails } = useContext(UserContext)

    const [cardState, setCardState] = useState({
        number: { complete: false, error: null },
        expiry: { complete: false, error: null },
        cvc: { complete: false, error: null }
    });

    const submitRef = useRef(null)

    const numberRef = useRef(null)
    const expireRef = useRef(null)
    const cvcRef = useRef(null)

    const handleSaveCard = async (e) => {
        e.preventDefault();

        if(!numberRef && !numberRef.current && !expireRef && !expireRef.current && !cvcRef && !cvcRef.current) return;
        
        try{
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: cardDetails.customer_id} , {headers : {Authorization : `Bearer ${cookies.token}`}});

            const cardNumber = elements.getElement(CardNumberElement);
            const result = await stripe.confirmCardSetup(data.clientSecret, { payment_method: { card: cardNumber } });

            const refs = [expireRef, numberRef, cvcRef];
            const errorCodes = [{code : 'incomplete_expiry', ref : expireRef} , {code : 'incomplete_number', ref: numberRef}, {code :'incomplete_cvc', ref : cvcRef}]

            if (result.error) {

                
                errorCodes.forEach(err => {
                    if(err.code == result.error.code){
                        err.ref.current.classList.add('error');
                    }else {
                        err.ref.current.classList.remove('error');
                    }
                })

                setToggleAlert({status: true, type: "Failed", statusCode:400, message: result.error.message});
                submitRef.current.disabled = false;

                return;
            } 
            
            refs.map(ref => {ref.current.classList.remove('error') ; ref.current.classList.add('success')})
            setToggleAlert({status: true, type: "Success", statusCode:200, message: 'Card Details Saved Successfully!'});

        }catch(err){
            setToggleAlert({status: true, type: "Internal_Error", statusCode: 500, message: String(err.response?.data?.message || err.message || 'Provider Error')});
        };
    };

    useEffect(() => {

        if (toggleCard) {
            document.documentElement.scrollTop = 0;

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {document.body.style.overflow = ''; document.documentElement.style.overflow = ''};
    }, [toggleCard]);

    useEffect(() => {
        
        if(!numberRef?.current || !expireRef?.current || !cvcRef?.current || !submitRef?.current) return;

        const fields = [
            { ref: numberRef, complete: cardState.number.complete },
            { ref: expireRef, complete: cardState.expiry.complete },
            { ref: cvcRef, complete: cardState.cvc.complete }
        ];

        fields.forEach(({ ref, complete }) => {
            ref.current.classList.toggle('success', complete);
        });
       
       const isFormComplete = fields.every(f => f.complete);
        submitRef.current.disabled = !isFormComplete;

        console.log({
        number: cardState.number.complete,
        expiry: cardState.expiry.complete,
        cvc: cardState.cvc.complete
        });


    },[cardState])

    

    const options = {
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
                    </div> 
                </form>
            </div>
        </div>
    );
};


export default CardDetails;