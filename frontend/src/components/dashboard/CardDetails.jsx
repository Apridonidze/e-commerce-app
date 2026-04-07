import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../../config";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { useRef } from "react";

const CardDetails = ({ toggleCard }) => {

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

    return(
        <div className="card-details-container w-50 mx-auto mt-5 p-3 rounded-2">

            <div className="card-details-top d-flex align-items-start gap-1 justify-content-between">
                <div className="card-details-top-start">
                    <h2>Payment Method</h2>
                    <span>Add secure card for your future purchases.</span>
                </div>
                <div className="card-details-top-end">
                    <div className="close-button ">
                    <button className="btn btn-none border-0"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>

            <div className="card-details-main">
                <form onSubmit={handleSaveCard}>
                    <CardElement />
                    <div className="card-details-buttons d-flex flex-column">
                        <button type="submit" ref={submitRef}>Save Card Details</button>   
                        <button className="btn btn-none">Cancle</button>    
                    </div> 
                </form>
            </div>
        </div>
    );
};


export default CardDetails;