import axios from "axios";
import { useCookies } from "react-cookie";  //importing react libraries

import { BACKEND_URL } from "../../config"; //definig backend url from config file
import { useState, useEffect, createContext } from "react"; //importing react hooks
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(); //creating userContext

export const UserProvider = ({ children }) => {

    const [cookies, , removeCookies] = useCookies(['token']);

    const [user, setUser] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);
    const [cartIds, setCartIds] = useState([]);

    useEffect(() => {

        if (!cookies.token) return;

        let isMounted = true;

        const authHeader = { headers: { Authorization: `Bearer ${cookies.token}`} };

        const fetchUser = axios.get(`${BACKEND_URL}/api/auth/me`, authHeader);
        const fetchCartDetails = axios.get(`${BACKEND_URL}/api/stripe/my-customer-id`, authHeader);
        const fetchCartIds = axios.get(`${BACKEND_URL}/api/cart`, authHeader);

        Promise.allSettled([fetchUser, fetchCartDetails, fetchCartIds])
        .then(([userRes, cardRes, cartRes]) => {

            if (!isMounted) return;

            if (userRes.status === "fulfilled") {
                setUser({...userRes.value.data.user, role: userRes.value.data.role});
            } else if (userRes.reason?.response?.status === 404) {
                removeCookies("token", { path: "/" });
            }

            cardRes.status === "fulfilled" ? setCardDetails(cardRes.value.data.details) : setCardDetails(null);
            

            if (cartRes.status === "fulfilled") {
                const data = cartRes.value.data;
                setCartIds(cartRes.value.status === 204 ? [] : data.cartItems);
            } else {    
                setCartIds([]);
            }
        });

        return () => isMounted = false;

    }, [cookies.token, removeCookies]);

    const values = { user, cartIds, cardDetails, setCartIds};

    return (
        <UserContext.Provider value={values}> {children}</UserContext.Provider>
    );
};