import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../config";
import { useCookies } from "react-cookie";

const ToggleAddress = ({ setToggleAdd, setToggleAlert, toggleAdd, setAddresses }) => {

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

    const [ cookies ] = useCookies(['token'])

    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city , setCity] = useState('');
    const [state , setState] = useState('')
    const [zipcode, setZipCode] = useState('');

    const [addressErr, setAddressErr] = useState('');
    const [apartmentErr, setApartmentErr] = useState('');
    const [cityErr , setCityErr] = useState('');
    const [stateErr , setStateErr] = useState('')
    const [zipcodeErr, setZipcodeErr] = useState('');

    const addressRef = useRef(null);
    const apartmentRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const zipcodeRef = useRef(null);
    const submitRef = useRef(null);

    const validateForm = async (e) => {
        e.preventDefault();

        let isValid = true;

        setAddressErr('');
        setApartmentErr('');
        setCityErr('');
        setStateErr('');
        setZipcodeErr('');

        const LIMITS = {address: 100, apartment: 20, city: 50, zipcode: 10};
        [addressRef, apartmentRef, cityRef, stateRef, zipcodeRef].forEach(ref => ref.current?.classList.remove('invalid'));

        const zipRegex = /^[0-9]{3,10}$/;
        const cityRegex = /^[a-zA-Z\s-]+$/;
        const addressRegex = /^(\d+\s+[a-zA-Z0-9\s]+|[a-zA-Z0-9\s]+\s+\d+)$/;

        if (!address.trim()) { setAddressErr('Address is required'); addressRef.current.classList.add('invalid'); addressRef.current.focus();isValid = false} 
        else if (address.length > LIMITS.address) {setAddressErr(`Max ${LIMITS.address} characters`);addressRef.current.classList.add('invalid');addressRef.current.focus();isValid = false} 
        else if (!addressRegex.test(address.trim())) {setAddressErr('Format: 12 Rustaveli');addressRef.current.classList.add('invalid');addressRef.current.focus();isValid = false}

        if (apartment) {
            if (apartment.length > LIMITS.apartment) {
                
                setApartmentErr(`Max ${LIMITS.apartment} characters`);
                apartmentRef.current.classList.add('invalid');
                
                if (isValid) apartmentRef.current.focus();
                isValid = false;

            } else if (apartment.length < 2) {
                
                setApartmentErr('Too short');
                apartmentRef.current.classList.add('invalid');
                
                if (isValid) apartmentRef.current.focus();
                isValid = false;
            };
        };

        if (!city.trim()) {
        
            setCityErr('City is required');
            cityRef.current.classList.add('invalid');
        
            if (isValid) cityRef.current.focus();
            isValid = false;
        
        } else if (city.length > LIMITS.city) {
        
            setCityErr(`Max ${LIMITS.city} characters`);
            cityRef.current.classList.add('invalid');
        
            if (isValid) cityRef.current.focus();
            isValid = false;
        
        } else if (!cityRegex.test(city.trim())) {
        
            setCityErr('Only letters allowed');
            cityRef.current.classList.add('invalid');
        
            if (isValid) cityRef.current.focus();
            isValid = false;
        }

        if (!state) {
            setStateErr('Please select a region');
            stateRef.current.classList.add('invalid');

            if (isValid) stateRef.current.focus();
            isValid = false;

        } else if (!regions.includes(state)) {

            setStateErr('Invalid region');
            stateRef.current.classList.add('invalid');
            
            if (isValid) stateRef.current.focus();
            isValid = false;

        }

        if (!zipcode.trim()) {

            setZipcodeErr('ZIP is required');
            zipcodeRef.current.classList.add('invalid');

            if (isValid) zipcodeRef.current.focus();
            isValid = false;

        } else if (zipcode.length > LIMITS.zipcode) {

            setZipcodeErr(`Max ${LIMITS.zipcode} digits`);
            zipcodeRef.current.classList.add('invalid');
            
            if (isValid) zipcodeRef.current.focus();
            isValid = false;

        } else if (!zipRegex.test(zipcode.trim())) {
            
            setZipcodeErr('3–10 digits only');
            zipcodeRef.current.classList.add('invalid');
            
            if (isValid) zipcodeRef.current.focus();
            isValid = false;

        };

        if(!isValid) submitRef.current.disabled = true;

        if(isValid){
            
            submitRef.current.disabled = false;
            
            try{

                const response = await axios.post(`${BACKEND_URL}/api/address/`, { address, apartment, city, state, zipcode } , {headers : {Authorization : `Bearer ${cookies.token}`}});
                
                if(response.status === 200) {
                    setToggleAlert({status: true, type: "Success", statusCode: response.status, message: response.data.message}); //toggling error message if customer intent could not be geneated
                    setToggleAdd(false);
                    setAddresses(prev => 
                        [...prev , {
                            address: address,
                            apartment: apartment ?? null,
                            city: city,
                            id: response.data.insertId,
                            state: state,
                            user_id: response.data.id,
                            zipcode: zipcode,
                        }])
                }


            }catch(err){
                if(err.response?.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
                if(err.response?.status === 500) return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated

            };
        };
    };

    useEffect(() => { //handing page scrolling for bg and mian container aligmnet

        if (toggleAdd) { //checking if toggleCard is true (if this component is mounted)
            document.documentElement.scrollTop = 0; //scrolling user at the very top of the page

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // hidding page overflow to prevent users from scrolling page when component is triggered
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = ''; //disabling overflow styling if component is not triggered
        }

        return () => {document.body.style.overflow = ''; document.documentElement.style.overflow = ''}; //cleanup function to remove styling after component unmounts

    }, [toggleAdd]); //logic executes on toggleCard dependency change

    return(
        <div className="toggle-address-container position-relative">
            <div className="toggle-address-top d-flex align-items-center mb-2 justify-content-between">
                <h3>Add New Address</h3>
                <button className="btn btn-none border-0" onClick={() => setToggleAdd(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={(e) => validateForm(e)}>
                <div className="toggle-address-main">

                    <div className="form-group" >
                        <label htmlFor="address">Street Address</label>
                        <input className="form-control" ref={addressRef} maxLength={100} type="text" placeholder="1221 Tbilisis Qucha" name="address" onChange={(e) => setAddress(e.target.value)} value={address} />
                        <span>{addressErr}</span>
                    </div>

                    <div className="form-group" >
                        <label htmlFor="apartment">Apartment (optional)</label>
                        <input className="form-control" ref={apartmentRef} maxLength={20} type="text" placeholder="Studio 403" name="apartment" onChange={(e) => setApartment(e.target.value)} value={apartment} />
                        <span>{apartmentErr}</span>
                    </div>

                    <div className="form-group" >
                        <label htmlFor="city">City</label>
                        <input className="form-control" ref={cityRef} maxLength={50} type="text" placeholder="Tbilisi" name="city" onChange={(e) => setCity(e.target.value)} value={city} />
                        <span>{cityErr}</span>
                    </div>

                    <div className="form-group" >

                        <label htmlFor="state">State / Province</label>
                        <select className="select-region form-control" ref={stateRef} name="state" onChange={(e) => setState(e.target.value)} value={state} >
                            <option value="">Select Region</option>
                            {regions.map(region => (<option key={region} value={region}>{region}</option>))}
                        </select>
                        
                        <span>{stateErr}</span>
                    </div>

                    <div className="form-group" >
                        <label htmlFor="zip">ZIP / Postal Code</label>
                        <input className="form-control" ref={zipcodeRef} maxLength={10} type="text" placeholder="E.g 0144" name="zip" onChange={(e) => setZipCode(e.target.value)} value={zipcode} />
                        <span>{zipcodeErr}</span>
                    </div>
                </div>

                <div className="toggle-address-end mt-5 d-flex align-items-center justify-content-between">
                    <button className="btn btn-none" onClick={() => setToggleAdd(false)}>Cancle</button>
                    <button className="btn" ref={submitRef} >Save Address</button>
                </div>
            </form>
        </div>
    );
};

export default ToggleAddress;