import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import { useRef } from "react";

const CardDetails = () => {

    const [ cookies ] = useCookies(['token'])

    const stripe = useStripe();
    const elements = useElements();

    const { customerId } = useContext(UserContext)

    const submitRef = useRef(null)

    const handleSaveCard = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: customerId} , {headers : {Authorization : `Bearer ${cookies.token}`}});

            const cardElement = elements.getElement(CardElement);

            const result = await stripe.confirmCardSetup(data.clientSecret, {payment_method: {card: cardElement}});
            submitRef.current.disabled = true;

            switch(result.type){
                case result.type === 'validation_error' : 
                    console.log(result.message)
                break;
                case result.type === 'card_declined' : 
                    console.log(result.message)
                break;
            }

        }catch(err){
            console.log(err)
        }
        
// /api/stripe/create-setup-intent
// /api/stripe/create-customer-intent

    }

    return(
        <div className="bg-white">
            <form onSubmit={handleSaveCard}>
                <CardElement />
                <button type="submit" ref={submitRef}>Save Card Details</button>    
            </form>
        </div>
    );
};

//TODO : add card details here
//TODO : create loading skeletons for whole component

export default CardDetails;