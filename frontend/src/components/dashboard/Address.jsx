import axios from "axios";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import ToggleAddress from "./ToggleAddress";

import { BACKEND_URL } from "../../../config";

const Address = ({ setToggleAlert }) => {

    const [ cookies ] = useCookies(['token'])

    const [addresses, setAddresses] = useState([]);//state to display addresses 
    const [isLoading ,setIsLoading] = useState(true);

    const [toggleAdd, setToggleAdd] = useState(false);

    useEffect(() => {

        const fetchAddresses = async() => {
            try{

                const addresses = await axios.get(`${BACKEND_URL}/api/address`, {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api call
                
                if(addresses.status === 204) return setAddresses([]); //handling 204 status code
                if(addresses.status === 200) return setAddresses(addresses.data.addresses); //handling 200 staus code

                setIsLoading(false);

            }catch(err){
                setIsLoading(false);
                setAddresses([]);//setting empty array in state if internal error occurs
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message if customer intent could not be geneated
            };
        };

        fetchAddresses();

    },[])

    return(
        <div className="addresses-container my-3">

            {toggleAdd ? <div className="bg" onClick={() => setToggleAdd(false)}><div className="toggle-address-background mx-auto"></div><ToggleAddress setToggleAdd={setToggleAdd}/></div> : <></>}
            
            <div className="address-row">
                <h5 className="my-auto">Address Book</h5>
            </div>

            {!isLoading ? "Loading..." : 
                <div className="address-wrapper">

                    {addresses.length === 0 ? "No address Component" : addresses.map(address => 
                        <div className="address-container">
                            {address.address}
                            {/* create componennt for address container*/}
                            {/* display empty state  */}
                            {/* implement laoding skeleton */}
                        </div>
                    )}
                    
                    {addresses?.length >= 3 ? <></> : 
                        <div className="add-new-address d-flex align-items-center gap-2 justify-content-center text-center py-3 my-2" onClick={() => setToggleAdd(true)}>
                            <i class="fa-solid fa-circle-plus"></i>
                            <span>Add New Address</span>
                        </div>
                    }
                </div>
            }
        </div>
    )
};

export default Address