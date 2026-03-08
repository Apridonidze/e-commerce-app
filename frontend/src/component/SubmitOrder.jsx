import { useEffect, useRef, useState } from "react";

const SubmitOrder = ({ setToggleOrder, orderItems, setAddress, address }) => {

    const [error, setError] = useState('')

    const inputRef = useRef(null)
    const btnRef = useRef(null)

    const validateAddress = (value) => {
        const regex = /^[0-9]+[A-Za-z\s]*\s[A-Za-z\s]+,\s[A-Za-z\s]+$/;
        return regex.test(value);
    };

    const handleAdressChange = (e) => {

        const value = e.target.value
        setAddress(value)

        if(!validateAddress(value)){
            setError('Invalid Address Form , Form Must Be : StreetNumber StreetName, City')
            
            inputRef?.current.classList.add('is-invalid')
            inputRef?.current.classList.remove('is-valid')

            btnRef.current.disabled = true
        
        }else{
        
            inputRef?.current.classList.add('is-valid')
            inputRef?.current.classList.remove('is-invalid')

            btnRef.current.disabled = false

            setError('')
        }
    }

    useEffect(() => {btnRef.current.disabled = true},[])


    return(
        <div className="submit-order-container position-relative">
            
            <div className="form-floating">
                <input className="form-control" type="text" name="address" id="address" placeholder="Add Adress Order To be Delivered" onChange={(e) => handleAdressChange(e)} value={address} ref={inputRef}/>
                <label htmlFor="address">Add Adress Order To be Delivered (Street Number Street Name, City)</label>
                <span className="text text-danger">{error}</span>
            </div>

            <button onClick={() => {setToggleOrder(false) , setAddress('')}}>Cancle Ordering</button>
            <button ref={btnRef} onClick={orderItems}>Ordaser</button>
        </div>
    )
}

export default SubmitOrder