import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Navigate, useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../component/Sidebar"
import User from "../component/User"
import AdminList from "../component/AdminList"
import OnWayProducts from "../component/OnWayProducts"
import DeliveredProducts from "../component/DeliveredProducts"
import Reports from "../component/Reports"
import Feedback from "../component/Feedback"
import CreateProduct from "../component/CreateProduct"

import Pendings from "../component/Pendings"

const AdminDashboard = () => {

    const [ cookies ] = useCookies(['token'])
    const [ user, setUser ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(null)
    const [ admins, setAdminds ] = useState(null)

    const { hash } = useLocation();

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await Promise.all([
                    axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)}),
                    axios.get(`${BACKEND_URL}/admin/admin-list` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setAdminds(resp.data.adminList)}),
                    axios.get(`${BACKEND_URL}/manage-products/pending-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; }),
                    axios.get(`${BACKEND_URL}/manage-products/on-way-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; }),
                    axios.get(`${BACKEND_URL}/manage-products/delivered-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; }),
                    axios.get(`${BACKEND_URL}/reports` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ;}),
                    axios.get(`${BACKEND_URL}/feedback` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; }),
            ])
            }catch(err){
                console.log(err)
            }

        }
        
        return () => {fetchStatus()};

    },[])

    //creatye function to update status of products that are bought by users api endpoint /update-product-status/product_id=:id/user_id=:userId/status=:status

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="admin-dashboard-container">
            {isAdmin !== null && !isAdmin ? <Navigate to='/'/> : <>
            
                <div className="row">

                    {/** toggle component on button click <CreateProduct /> */}
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>
                    <div className="admin-dashboard-end col">
                        <User />
                        <AdminList admins={admins} user={user}/>
                        <section id="manage-products">
                            <Pendings />
                            <OnWayProducts />
                            <DeliveredProducts />
                        </section>
                        <section id="reports"><Reports /></section>
                        <Feedback />
                    </div>
                </div>
            
            </>}
        </div>
    )
}

export default AdminDashboard