import { useRef, useState } from "react";

const ToggleAddress = ({ setToggleAdd }) => {

    const regions = [
        "Tbilisi",
        "Adjara",
        "Imereti",
        "Samegrelo-Zemo Svaneti",
        "Kvemo Kartli",
        "Shida Kartli",
        "Kakheti",
        "Guria",
        "Racha-Lechkhumi and Kvemo Svaneti",
        "Samtskhe-Javakheti",
        "Mtskheta-Mtianeti",
        "California",
        "Texas",
        "Florida",
        "New York",
        "Illinois",
        "Pennsylvania",
        "Ohio",
        "Georgia (US)",
        "North Carolina",
        "Michigan",
        "Bavaria",
        "Baden-Württemberg",
        "North Rhine-Westphalia",
        "Hesse",
        "Saxony",
        "Berlin",
        "Hamburg",
        "Brandenburg",
        "Lower Saxony",
        "Thuringia"
    ];

    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city , setCity] = useState('');
    const [state , setState] = useState('')
    const [zipcode, setZidcode] = useState('');

    const [addressErr, setAddressErr] = useState('');
    const [apartmentErr, setApartmentErr] = useState('');
    const [cityErr , setCityErr] = useState('');
    const [stateErr , setStateErr] = useState('')
    const [zipcodeErr, setZidcodeErr] = useState('');

    const addressRef = useRef(null);
    const apartmentRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const zipcodeRef = useRef(null);
    const submitRef = useRef(null);

    return(
        <div className="toggle-address-container">
            <div className="toggle-address-top d-flex align-items-center justify-content-between">
                <h4>Add New Address</h4>
                <button className="btn btn-none border-0" onClick={() => setToggleAdd(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div className="toggle-address-main">

                <div className="form-group my-2">
                    <label htmlFor="address">Street Address</label>
                    <input className="form-control" type="text" placeholder="1221 Tbilisis Qucha" name="address" onChange={(e) => setAddress(e.target.value)} value={address} ref={addressRef}/>
                    <span>{addressErr}</span>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="apartment">Apartment (optional)</label>
                    <input className="form-control" type="text" placeholder="Studio 403" name="apartment" onChange={(e) => setApartment(e.target.value)} value={apartment} ref={apartmentRef}/>
                    <span>{apartmentErr}</span>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="city">City</label>
                    <input className="form-control" type="text" placeholder="Tbilisi" name="city" onChange={(e) => setCity(e.target.value)} value={city} ref={cityRef}/>
                    <span>{cityErr}</span>
                </div>

                <div className="form-group my-2">

                    <label htmlFor="state">State / Province</label>
                    <select className="select-region form-control" name="state" onChange={(e) => setState(e.target.value)} value={state} ref={stateRef}>
                        <option value="">Select Region</option>
                        {regions.map(region => (<option key={region} value={region}>{region}</option>))}
                    </select>
                    
                    <span>{stateErr}</span>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="zip">ZIP / Postal Code</label>
                    <input className="form-control" type="text" placeholder="E.g 0144" name="zip" onChange={(e) => setZidcode(e.target.value)} value={zipcode} ref={zipcodeRef}/>
                    <span>{zipcodeErr}</span>
                </div>
            </div>
            <div className="toggle-address-end">
                <button className="btn btn-none">Cancle</button>
                <button className="btn" ref={submitRef}>Save Address</button>
            </div>
        </div>
    );
};

export default ToggleAddress;