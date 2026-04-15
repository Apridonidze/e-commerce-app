const FailedPaymentMessage = ({ setTogglePayment , orderItems }) => {
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