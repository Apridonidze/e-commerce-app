import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const AdminDashboard = () => {

    
    const [ cookies ] = useCookies(['token'])
    const [ isAdmin, setIsAdmin ] = useState(false)

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)})

            }catch(err){
                console.log(err)
            }

        }
        
        return () => {fetchStatus()};

    },[])

    return(
        <div className="admin-dashboard-container">
            <h1>admin dashboard</h1>
        </div>
    )
}

export default AdminDashboard