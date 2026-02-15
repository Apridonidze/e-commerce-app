import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Navigate, useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import User from "../component/User"
import AdminList from "../admin/components/AdminList"
import OnWayProducts from "../admin/components/products/OnWayProducts"
import DeliveredProducts from "../admin/components/products/DeliveredProducts"
import Reports from "../component/ReportDetails"
import Feedbacks from "../component/FeedbackDetails"
import CreateProduct from "../admin/components/products/CreateProduct"

import Pendings from "../admin/components/products/PendingProducts";
import Products from "../admin/components/products/LatestProducts"; 

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

    const [toggleCreateNew, setToggleCreateNew] = useState(false);

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
        // refactor and add error handling 
        return () => {fetchStatus()};

    },[])

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="admin-dashboard-container">
            {isAdmin !== null && !isAdmin ? <Navigate to='/'/> : <>

                {toggleCreateNew ? <div><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct /></div> : <></> }
            
                <div className="row">
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>

                    <div className="admin-dashboard-end col">

                        <User />
                        <AdminList admins={admins} user={user}/>

                        <section id="manage-products">

                            <button onClick={() => setToggleCreateNew(!toggleCreateNew)}>Add</button>
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