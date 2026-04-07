const CardHolder = ({ setToggleCard, generateCustomerId, cardDetails }) => {
    return(
        <div className="card-holder-container">
            <div className="card-row">
                <h5 className="my-auto">Card Details</h5>
                <span className="my-auto" onClick={() => {cardDetails?.customer_id ? setToggleCard(true) :  generateCustomerId()}}>{cardDetails?.last4 ? 'Edit Card' : 'Add Card'}</span>
            </div>

            <div className="card-container p-3 rounded-2">
                <div className="card-container-header">
                    <h6>Primary Account</h6>
                    <span className="cardIcon">{cardDetails.brand == 'visa' ? <i class="fa-brands fa-cc-visa"></i> : cardDetails.brand == 'mastercard' ? <i class="fa-brands fa-cc-mastercard"></i> : <i class="fa-regular fa-credit-card"></i>}</span>
                </div>
                <h4>**** **** **** {cardDetails.last4 ? cardDetails.last4 : '****'}</h4>
            </div>
        </div>
    );
};

export default CardHolder;