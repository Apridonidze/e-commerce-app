import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const CardDetails = () => {

    const stripe = useStripe();
    const elements = useElements();

    const { customerId } = useContext(UserContext)

    const handleSaveCard = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: customerId});

            const cardElement = elements.getElement(CardElement);

            const result = await stripe.confirmCardSetup(data.clientSecret, {payment_method: {card: cardElement}});

            console.log("Saved!", result.setupIntent.payment_method);
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
                <button type="submit">Save Card Details</button>    
            </form>
        </div>
    );
};

//TODO : add card details here
//TODO : create loading skeletons for whole component

export default CardDetails;