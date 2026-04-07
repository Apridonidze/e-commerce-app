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

    const { cardDetails } = useContext(UserContext)

    const submitRef = useRef(null)

    const handleSaveCard = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios.post(`${BACKEND_URL}/api/stripe/create-setup-intent`, {customerId: cardDetails.customer_id} , {headers : {Authorization : `Bearer ${cookies.token}`}});

            const cardElement = elements.getElement(CardElement);

            submitRef.current.disabled = true;
            const result = await stripe.confirmCardSetup(data.clientSecret, {payment_method: {card: cardElement}});

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