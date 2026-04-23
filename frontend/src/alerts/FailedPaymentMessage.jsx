import { useEffect } from "react"; //importing react hook

const FailedPaymentMessage = ({ setTogglePayment , orderItems }) => {

    useEffect(() => { //handing page scrolling for bg and mian container aligmnet
    
        document.documentElement.scrollTop = 0; //scrolling user at the very top of the page
    
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden'; // hidding page overflow to prevent users from scrolling page when component is triggered
               
        return () => {document.body.style.overflow = ''; document.documentElement.style.overflow = ''}; //cleanup function to remove styling after component unmounts
    
    }, []); //logic executes once component toggles

    return(
        <div className="payment-message-container">

            <div className="fail-icon"><i class="fa-regular fa-circle-xmark"></i></div>

            <div className="d-flex flex-column">
                <h3>Payment Failed</h3>
                <small>Your payment has been processed successfully. Your order is now confirmed and being prepared.</small>
            </div>

            <div className="payment-row">
                <small>Payment failed due to a technical issue, declined transaction, authentication error, insufficient funds, expired session, or network problem; no charges were made-please check your details, try again, or use a different payment method.</small>
            </div>

            <div className="d-flex gap-2">
                <button className="tryAgain btn" onClick={() => {orderItems() ; setTogglePayment({success : false , status : false , orderId : null})}}>Try Again</button>
                <button className="btn text-decoration-underline border-0" onClick={() => setTogglePayment({success : false , status : false , orderId : null})}>Return To Dashboard</button>
            </div>

        </div>
    );
};

export default FailedPaymentMessage;//exporting component