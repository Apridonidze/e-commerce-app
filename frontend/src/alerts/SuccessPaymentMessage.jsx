const SuccessPaymentMessage = ({ setTogglePayment , togglePayment }) => {
    return(
        <div className="payment-message-container">
            
            <div className="success-icon"><i class="fa-regular fa-circle-check"></i></div>
            
            <div className="d-flex flex-column">
                <h3>Payment Successful</h3>
                <small>Your payment has been processed successfully. Your order is now confirmed and being prepared.</small>
            </div>

            <div className="payment-row d-flex align-items-start justify-content-between w-100">
                <div className="payment-row-start d-flex flex-column">
                    <span>Order Id :</span>
                    <span>Excepted Delivery :</span>
                </div>
                <div className="payment-row-end d-flex flex-column">
                    <span>{togglePayment.orderId}</span>
                    <span>{new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="d-flex"><button className="return btn fs-6" onClick={() => setTogglePayment({status : false, succes : false , orderId : null})}>Return To Dashboard</button></div>

        </div>
    );
};

export default SuccessPaymentMessage; //exporting component