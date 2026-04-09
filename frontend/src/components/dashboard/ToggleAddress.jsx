const ToggleAddress = ({ setToggleAdd }) => {
    return(
        <div className="toggle-address-container">
            <div className="toggle-address-top">
                <div className="toggle-address-top-start"></div>
                <div className="toggle-address-top-end"></div>
            </div>
            <div className="toggle-address-main">
                <div className="address-row"></div>
                <div className="address-row"></div>
                <div className="address-row"></div>
            </div>
            <div className="toggle-address-end"></div>
        </div>
    );
};

export default ToggleAddress;