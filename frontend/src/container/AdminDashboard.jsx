import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Sidebar from "../component/Sidebar"
import { Navigate } from "react-router-dom"
import User from "../component/User"

const AdminDashboard = () => {

    
    const [ cookies ] = useCookies(['token'])
    const [ isAdmin, setIsAdmin ] = useState(null)

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
            {isAdmin !== null && !isAdmin ? <Navigate to='/'/> : <>
            
                <div className="row">
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>
                    <div className="admin-dashboard-end col">
                        <User />
                    </div>
                </div>
            
            </>}
        </div>
    )
}

export default AdminDashboard