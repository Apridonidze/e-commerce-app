import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"
import Sidebar from "../component/Sidebar"
import { Navigate } from "react-router-dom"
import User from "../component/User"
import AdminList from "../component/AdminList"
import Pendings from "../component/Pendings"
import OnWayProducts from "../component/OnWayProducts"
import DeliveredProducts from "../component/DeliveredProducts"

const AdminDashboard = () => {

    const [ cookies ] = useCookies(['token'])
    const [ user, setUser ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(null)
    const [ admins, setAdminds ] = useState(null)

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await Promise.all([
                    axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)}),
                    axios.get(`${BACKEND_URL}/admin/admin-list` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setAdminds(resp.data.adminList)}),
                    axios.get(`${BACKEND_URL}/products/admin-list` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; console.log(resp)}),
            ])
                
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
                        <AdminList admins={admins} user={user}/>
                        <Pendings />
                        <OnWayProducts />
                        <DeliveredProducts />
                    </div>
                </div>
            
            </>}
        </div>
    )
}

export default AdminDashboard