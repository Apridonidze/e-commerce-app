import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

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

    const [ admins, setAdmins ] = useState(null)

    const [ latestProducts, setLatestProducts] = useState([])
    const [ pendings, setPendings] = useState([])
    const [ onway, setOnway ] = useState([])
    const [ delivered, setDelivered ] = useState([])

    const [ reports , setReports ] = useState([])
    const [ feedback, setFeedback ] = useState([])

    const [toggleCreateNew, setToggleCreateNew] = useState(false);

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                const [ adminsRes, productsRes, pendingRes, onWayRes, deliveredRes, reportsRes ] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/admin/admin-list`, config),
                    axios.get(`${BACKEND_URL}/api/manage-orders/pending-order`, config),
                    axios.get(`${BACKEND_URL}/api/manage-orders/onway-order`, config),
                    axios.get(`${BACKEND_URL}/api/manage-orders/delivered-order`, config),
                    axios.get(`${BACKEND_URL}/api/reports/product-reports`, config)
                ]);
                    
                setAdmins(adminsRes.data.adminList);
                setLatestProducts(productsRes.data.products);
                setPendings(pendingRes.data.products);
                setOnway(onWayRes.data.products);
                setDelivered(deliveredRes.data.products);
                setReports(reportsRes.data.reports);
                
            }catch(err){
                console.log(err)
            }

        }
        // refactor and add error handling , decleare valid api routes 
        return () => {fetchStatus()};

    },[])

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="admin-dashboard-container">

                {toggleCreateNew ? <div><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct /></div> : <></> }
            
                <div className="row">
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>

                    <div className="admin-dashboard-end col">

                        <User />
                        <AdminList admins={admins} />

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
            
        </div>
    )
}

export default AdminDashboard