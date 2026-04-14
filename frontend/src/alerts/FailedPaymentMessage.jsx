const FailedPaymentMessage = ({ setTogglePayment }) => {
    return(
        <div className="payment-message-container">

            <div className="fail-icon"><i class="fa-regular fa-circle-xmark"></i></div>

            <div className="d-flex flex-column">
                <h3>Payment Failed</h3>
                <small>Your payment has been processed successfully. Your order is now confirmed and being prepared.</small>
            </div>

            <div className="payment-row">
                <small>We couldn’t process your payment due to a technical issue, declined transaction, failed authentication, insufficient funds, expired session, or network error, and no charges were made to your account, so please check your details, try again, or use a different payment method, and contact support if the issue persists.</small>
            </div>

            <div className="d-flex gap-2">
                <button className="tryAgain btn">Try Again</button>
                <button className="return btn">Return To Dashboard</button>
            </div>

        </div>
    )
}

export default FailedPaymentMessage;