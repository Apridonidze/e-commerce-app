import axios from "axios";
import { useCookies } from "react-cookie";  //importing react libraries

import { BACKEND_URL } from "../../config"; //definig backend url from config file
import { useState, useEffect, createContext, useMemo } from "react"; //importing react hooks

export const UserContext = createContext(); //creating userContext

export const UserProvider = ({children}) => {
    
    const [ cookies, setCookies, removeCookies ] = useCookies(['token']); //defining cookies and its functions

    const [user,setUser] = useState(null);
    const [cardDetails, setCardDetails] = useState();
    const [cartIds , setCartIds] = useState([]); //states for user data

    useEffect(() => {

        const fetchUser = async() => {

            try{

                const user = await axios.get(`${BACKEND_URL}/api/auth/me` , {headers : {Authorization : `Bearer ${cookies.token}`}});
                
                if(user.status === 404)return removeCookies('token' , {path : '/'})
                    
                let data = user.data.user
                setUser({...data, role : user.data.role})

            }catch(err){
                console.log(err)
                //add alert here
            }
        }

        const fetchCartDetails = async() => {
            try{

                    const customer = await axios.get(`${BACKEND_URL}/api/stripe/my-customer-id` , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    setCardDetails(customer.data.details)
                    
                }catch(err){
                    setCardDetails(null)
                    console.log(err)
                    return
                }
        }


        const fetchCartIds = async() => {
            try{

                    const cartIds = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    if(cartIds.status === 204){setCartIds([]); return}
                    
                    setCartIds(cartIds.data.cartItems)

                }catch(err){
                    setCartIds([]);
                    console.log(err);
                    //add alert heere
                }
        } 

        if(!cookies.token) return; 

        const fetchData = async () => {
            await fetchUser();
            await fetchCartDetails();
            await fetchCartIds();
        }

        fetchData()

    }, [cookies.token]);


    const values = useMemo(() => ({
        user,
        cartIds,
        cardDetails,
        setCartIds
    }), [user, cartIds, cardDetails]);

    return(
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
};