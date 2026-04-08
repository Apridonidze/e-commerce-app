import axios from "axios";
import { CardElement,CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../../config";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { useRef } from "react";

const CardDetails = ({ toggleCard, setToggleCard }) => {

    const [ cookies ] = useCookies(['token'])

    const stripe = useStripe();
    const elements = useElements();

    const { cardDetails } = useContext(UserContext)

    const submitRef = useRef(null)

    const handleSaveCard = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: cardDetails.customer_id} , {headers : {Authorization : `Bearer ${cookies.token}`}});

            const cardNumber = elements.getElement(CardNumberElement);
            const result = await stripe.confirmCardSetup(data.clientSecret, { payment_method: { card: cardNumber } });

            submitRef.current.disabled = true;

            if (result.error) {
                console.log(result.error.message);
                submitRef.current.disabled = false;
            } else {
                console.log("Card saved successfully!");
            }

        }catch(err){
            console.log(err)
        }

    }

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

const options = {
  style: {
    base: {
      color: '#94a3b8',          // text color
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',        // placeholder text color
      },
      fontFamily: 'Arial, sans-serif',
      letterSpacing: '0.5px',
      lineHeight: '1.5',
    },
    invalid: {
      color: '#dc3545',          // invalid/error text
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

                        <div className="stripe-input-group">
                            <label htmlFor="card-number">Card Number</label>
                            <div className="stripe-input-wrapper" id="card-number">
                            <CardNumberElement  options={options}/>
                            </div>
                        </div>

                        <div className="stripe-cart-row d-flex align-items-center borders">
                            <div className="stripe-input-group flex-fill me-2">
                            <label htmlFor="card-expiry">Expiry</label>
                            <div className="stripe-input-wrapper" id="card-expiry">
                                <CardExpiryElement options={options}/>
                            </div>
                            </div>
                            <div className="stripe-input-group flex-fill">
                            <label htmlFor="card-cvc">CVC</label>
                            <div className="stripe-input-wrapper" id="card-cvc">
                                <CardCvcElement  options={options}/>
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