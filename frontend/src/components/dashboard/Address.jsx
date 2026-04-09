import { useEffect, useState } from "react";

const Address = ({ setToggleAlert }) => {

    const [addresses, setAddresses] = useState([]);//state to display addresses 
    const [isLoading ,setIsLoading] = useState(true);

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
        <div className="addresses-container">
            {isLoading ? "Loading..." : 
                <div className="address-wrapper">

                {addresses.length === 0 ? "No address Component" : addresses.map(address => 
                    <div className="address-container">
                        {address.address}
                    </div>
                )}

                </div>
            }
        </div>
    )
};

export default Address