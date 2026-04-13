const PaymentMesSuccessPaymentMessagesage = () => {


    return(
        <div className="payment-message-container d-flex align-items-center justify-content-start gap-3 h-auto">
            <i class="fa-regular fa-circle-check"></i>
            
            <h3>Payment Successful</h3>
            <h6>Your payment has been processed successfully. Your order is now confirmed and being prepared.</h6>

            <div className="payment-row">
                <h6>Order Id : </h6>
                <h6>Excepted Delivery : </h6>
            </div>

            <div className="d-flex">
                <button>Return To Dashboard</button>
            </div>

        </div>
    )
}

export default PaymentMesSuccessPaymentMessagesage