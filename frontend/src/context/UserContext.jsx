import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";


export const UserContext = createContext();


export const UserProvider = ({children}) => {
    
    const [ cookies, setCookies, removeCookies ] = useCookies(['token'])

    const [user,setUser] = useState(null)
    const [cartIds , setCartIds] = useState([])

    useEffect(() => {

        const fetchUser = async() => {

            if(!cookies.token) return; 

            try{

                const user = await axios.get(`${BACKEND_URL}/api/auth/me` , {headers : {Authorization : `Bearer ${cookies.token}`}});
                
                if(user.status === 404)return removeCookies(cookies.token , {path : '/'})
                    
                let data = user.data.user
                setUser({...data, role : user.data.role})

                try{

                    const cartIds = await axios.get(`${BACKEND_URL}/api/cart`, {headers : {Authorization : `Bearer ${cookies.token}`}})
           
                    if(cartIds.status === 204){setCartIds([]); return}
                
                    const cartResp = cartIds.data.products              
                    const mappedCartIds = cartResp.map((id) => {return id.product_id})
            
                    setCartIds(mappedCartIds)

                }catch(err){
                    setCartIds([]);
                    console.log(err);
                    //add alert heere
                }

                return;

            }catch(err){
                console.log(err)
                //add alert here
            }
        }

        return () => {fetchUser()}

    }, []);

    return(
        <UserContext.Provider value={{ user, cartIds }}>{children}</UserContext.Provider>
    )
}