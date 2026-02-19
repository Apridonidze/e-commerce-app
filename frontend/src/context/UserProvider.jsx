import { useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";

const UserProvider = () => {
    
    const [ cookies, setCookies, removeCookies ] = useCookies(['token'])
    const UserContext = createContext();

    const [user,setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [cartIds , setCartIds] = useState([])

    useEffect(() => {

        const fetchUser = async() => {

            if(!cookies.token) return; 

            try{

                const user = await axios.get(`${BACKEND_URL}/api/auth/me` , {headers : {Authorization : `Bearer ${cookies.token}`}});
                
                if(user.status === 404)return removeCookies(cookies.token , {path : '/'})

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
        <UserContext.Provider >{children}</UserContext.Provider>
    )
}

export default UserProvider