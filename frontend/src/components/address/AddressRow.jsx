const AddressRow = ({ address, removeAddress, setTargetAddress }) => {

    return(
        <div className="address-row-container" key={address.id} onClick={() => setTargetAddress(address.id)}>
            <div className="address-row-wrapper">
                <div className="address-row-top d-flex align-items-center mb-3 justify-content-between">
                    <span className="fw-bold">Primary Address</span>
                    <span className="remove" style={{fontSize : '14px', letterSpacing : "1px"}} onClick={() => removeAddress(address.id)}>Remove</span>
                </div>
                <div className="address-row-main d-flex flex-column gap-2">
                    <span><i class="fa-solid fa-location-dot"></i> <span>{address.state}</span> / {address.city}</span>
                    {address.apartment ? <span><i class="fa-solid fa-building-user"></i> {address.apartment}</span> : <></>}
                    <span><i class="fa-solid fa-building-user"></i>{JSON.parse(address.address)}</span>
                    <span><i class="fa-solid fa-inbox"></i> Zip Code: {address.zipcode}</span>
                </div>  
            </div>
        </div>
    );
};

export default AddressRow;