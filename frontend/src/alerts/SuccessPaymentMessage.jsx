const SuccessPaymentMessage = ({ setTogglePayment , togglePayment }) => {


    return(
        <div className="payment-message-container">
            
            <div className="success-icon"><i class="fa-regular fa-circle-check"></i></div>
            
            <div className="d-flex flex-column">
                <h3>Payment Successful</h3>
                <small>Your payment has been processed successfully. Your order is now confirmed and being prepared.</small>
            </div>

            <div className="payment-row">
                <h6>Order Id : {togglePayment.orderId}</h6>
                <h6>Excepted Delivery : {new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h6>
            </div>

            <div className="d-flex"><button className="return btn fs-6" onClick={() => setTogglePayment({status : false, succes : false , orderId : null})}>Return To Dashboard</button></div>

        </div>
    )
}

export default SuccessPaymentMessage