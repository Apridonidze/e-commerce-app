const FailedPaymentMessage = ({ setTogglePayment }) => {
    return(
        <div className="payment-message-container d-flex align-items-center justify-content-start gap-3 h-auto">
            <i class="fa-regular fa-circle-xmark"></i>

            <h3>Payment Failed</h3>
            <h6>Your payment has been processed successfully. Your order is now confirmed and being prepared.</h6>

            <div className="payment-row">
                <h6>We couldn’t process your payment due to a technical issue, declined transaction, failed authentication, insufficient funds, expired session, or network error, and no charges were made to your account, so please check your details, try again, or use a different payment method, and contact support if the issue persists.</h6>
            </div>

            <div className="d-flex">
                <button>Try Again</button>
                <button>Return To Dashboard</button>
            </div>

        </div>
    )
}

export default FailedPaymentMessage;