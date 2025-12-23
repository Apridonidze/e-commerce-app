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
import Feedbacks from "../component/Feedbacks"
import CreateProduct from "../component/CreateProduct"

import Pendings from "../component/Pendings"
import Products from "../component/Products"

const AdminDashboard = () => {

    const { hash } = useLocation();
    const [ cookies ] = useCookies(['token'])

    const [ user, setUser ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(null)
    const [ admins, setAdmins ] = useState(null)

    const [ latestProducts, setLatestProducts] = useState([])
    const [ pendings, setPendings] = useState([])
    const [ onway, setOnway ] = useState([])
    const [ delivered, setDelivered ] = useState([])

    const [ reports , setReports ] = useState([])
    const [ feedback, setFeedback ] = useState([])

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await Promise.all([
                    axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)}),
                    axios.get(`${BACKEND_URL}/admin/admin-list` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setAdmins(resp.data.adminList)}),
                    axios.get(`${BACKEND_URL}/products/admin-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setLatestProducts(prev => [...prev, ...resp.data.products])}),
                    axios.get(`${BACKEND_URL}/manage-products/pending-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setPendings(prev => [...prev, ...resp.data.products])}),
                    axios.get(`${BACKEND_URL}/manage-products/on-way-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setOnway(prev => [...prev, ...resp.data.products])}),
                    axios.get(`${BACKEND_URL}/manage-products/delivered-items` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setDelivered(prev => [...prev, ...resp.data.products])}),
                    axios.get(`${BACKEND_URL}/reports/product-reports` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setReports(prev => [...prev, ...resp.data.reports])}),
                    axios.get(`${BACKEND_URL}/feedback` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setFeedback(prev => [...prev, ...resp.data.feedback])}),
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
                            
                            <Products latestProducts={latestProducts}/>
                            <Pendings pendings={pendings}/>
                            <OnWayProducts onway={onway}/>
                            <DeliveredProducts delivered={delivered}/>
                            
                        </section>

                        <section id="reports">
                            <Reports reports={reports}/>
                            <Feedbacks feedback={feedback}/>
                        </section>

                    </div>
                </div>
            
            </>}
        </div>
    )
}

export default AdminDashboard