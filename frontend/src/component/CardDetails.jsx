import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../config";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const CardDetails = () => {

    const stripe = useStripe();
    const elements = useElements();


    const handleSaveCard = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios.post("/create-setup-intent", {
            customerId: "cus_xxx"
            });

            const cardElement = elements.getElement(CardElement);

            // 2. Confirm card setup
            const result = await stripe.confirmCardSetup(data.clientSecret, {
            payment_method: {
                card: cardElement,
            },
            });

            console.log("Saved!", result.setupIntent.payment_method);
        }catch(err){
            console.log(err)
        }
        
// /api/stripe/create-setup-intent
// /api/stripe/create-customer-intent

    }

    return(
        <form onSubmit={handleSaveCard}>
            <CardElement />
            <button type="submit">Save Card Details</button>    
        </form>
    );
};

//TODO : add card details here
//TODO : create loading skeletons for whole component

export default CardDetails;