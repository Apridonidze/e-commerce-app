const EmptyAddress = () => {
    return(
        <div className="empty-address-container p-3">
            <div className="location-icon"><i class="fa-solid fa-location-dot"></i></div>
            <h6>Your Address Book Is Empty</h6>
            <small>Save your shipping destinations for a faster checkout experience.</small>
        </div>
    );
};

export default EmptyAddress; //exporting component