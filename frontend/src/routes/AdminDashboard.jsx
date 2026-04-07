import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import AdminList from '../admin/components/AdminList'
import CreateProduct from "../admin/components/CreateProduct"
import AdminOrder from "../admin/components/AdminOrder"
import Report from '../components/report/Report'
import { Link } from "react-router-dom"
import DeleteReport from "../admin/components/DeleteReport"
import RespondReport from "../admin/components/RespondReport"
import AdminFeedback from "../admin/components/AdminFeedback"
import ManageAdmins from "../admin/components/ManageAdmins"

const AdminDashboard = () => {

    const { hash } = useLocation();
    const [ cookies ] = useCookies(['token'])

    const [ admins, setAdmins ] = useState(null)
    const [ orders,  setOrders ] = useState([])
    const [ reports , setReports ] = useState([])
    const [ feedbacks, setFeedbacks ] = useState([])
    const [ soldItems , setSoldItems] = useState([])

    const [toggleCreateNew, setToggleCreateNew] = useState(false);
    const [toggleManageAdmins ,setToggleManageAdmins] = useState(false);
    const [toggleDeleteReport, setToggleDeleteReport] = useState({status : false, reportDetails : null});
    const [toggleRespondReport, setToggleRespondReport] = useState({status : false, reportDetails : null});

    const [reportsOffset, setReportsOffset] = useState(0)

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`, config)
                const data = [...response.data.pending, response.data.onWay, response.data.delivered].filter((arr) => arr.length !== 0).flat()
                
                setOrders(data)
                setSoldItems(response.data.soldItems)
                setAdmins({onlineAdmins : response.data.onlineAdmins , offlineAdmins : response.data.offlineAdmins}) 


            } catch (error) {
                console.log("Dashboard fetch error:", error);
            }
        };

        const fetchReports = async () => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/report/${reportsOffset}`, config)
                console.log(response)
                if(response.status == 204) return setReports([])
                
                setReports(response.data.reports);

            }catch(err){
                console.log(err)
            }
        }

        const fetchFeedbacks = async() => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/feedback/${0}/${undefined}`, config)
                console.log(response)
                if(response.status === 204) setFeedbacks([])

                setFeedbacks(response.data.feedbacks)

            }catch(err){
                console.log(err)
            }
        }

        return () => {
            fetchStatus();
            fetchReports();
            fetchFeedbacks();
        }

    }, []);

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="admin-dashboard-container">

            {toggleCreateNew ? <div><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct /></div> : <></> }
            {toggleDeleteReport.status ? <div><div className="delete-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleDeleteReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><DeleteReport setToggleDeleteReport={setToggleDeleteReport} toggleDeleteReport={toggleDeleteReport} setReports={setReports}/></div> : <></> }
            {toggleRespondReport.status ? <div><div className="respond-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleRespondReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><RespondReport setToggleRespondReport={setToggleRespondReport} toggleRespondReport={toggleRespondReport} setReports={setReports}/></div> : <></> }
            {toggleManageAdmins ? <div><div className="manage-admins-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleManageAdmins(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><ManageAdmins setToggleManageAdmins={setToggleManageAdmins} setAdmins={setAdmins} admins={admins}/></div> : <></>}
                <div className="row">
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>

                    <div className="admin-dashboard-end col">
                        {/* create AdminHeader.jsx which will have toggle buttons and additional features of admin dashbaord */}

                    <AdminList admins={admins} setToggleManageAdmins={setToggleManageAdmins}/>
                    {/* add charts for products */}
                    {/* fetch counts of orders and sold items  */}
                    {/* add recent activities component on side */}

                        <section id="manage-products">

                            <button onClick={() => setToggleCreateNew(true)}>Add New Product</button>

                            <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>Pending Orders : {orders?.filter(prod => prod.status == 'Pending')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/pending-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'Pending').length > 0 ? orders?.filter(prod => prod.status == 'Pending').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no pending items"}
                            </div>

                             <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>On Way Orders : {orders?.filter(prod => prod.status == 'OnWay')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/onway-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'OnWay').length > 0 ? orders?.filter(prod => prod.status == 'OnWay').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no on way items"}
                            </div>

                             <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>Delivered Orders : {orders?.filter(prod => prod.status == 'Delivered')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/delivered-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'Delivered').length > 0 ? orders?.filter(prod => prod.status == 'Delivered').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no delivered items"}
                            </div>

                        </section>

                        <section id="reports">
                            <h1>Reports</h1>
                            <Link to={'/admin-dashboard/reports'}>Visit</Link>
                            {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No reports'}
                        </section>

                        <section id="feedbacks">
                            <h1>Feedbacks</h1>
                            <Link to={'/admin-dashboard/feedbacks'}>Visit</Link>
                            {feedbacks?.length !== 0 ? feedbacks?.map((feedback, feedbackId) => (
                                <AdminFeedback feedback={feedback} feedbackId={feedbackId} key={feedbackId} setFeedbacks={setFeedbacks}/>
                            )) : "No Feedbacks"}
                        </section>

                    </div>
                </div>
            
        </div>
    )
}

export default AdminDashboard