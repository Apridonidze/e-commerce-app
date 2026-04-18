import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import AdminList from '../admin/components/AdminList'
import CreateProduct from "../admin/components/CreateProduct"
import Report from '../components/report/Report'
import { Link } from "react-router-dom"
import DeleteReport from "../admin/components/DeleteReport"
import RespondReport from "../admin/components/RespondReport"
import AdminFeedback from "../admin/components/AdminFeedback"
import ManageAdmins from "../admin/components/ManageAdmins"

import '../styles/dashboard.css'
import '../styles/admin.dashboard.css'

import AdminHeader from "../admin/components/AdminHeader"
import ManageOrders from "../admin/components/orders/ManageOrders"

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

    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const [reportsOffset, setReportsOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isReportsLoading , setIsReportsLoading] = useState(true);
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(true)

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`, config)
                const data = [...response.data.pending, response.data.onWay, response.data.delivered].filter((arr) => arr.length !== 0).flat()
                
                setOrders(data)
                setSoldItems(response.data.soldItems)
                setAdmins({onlineAdmins : response.data.onlineAdmins , offlineAdmins : response.data.offlineAdmins})

                setIsLoading(false);

            } catch (err) {

                setOrders([]);
                setSoldItems([]);
                setAdmins({onlineAdmins : [] , offlineAdmins : []});

                setIsLoading(false);

                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            }
        };

        const fetchReports = async () => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/report/${reportsOffset}`, config)
                
                if(response.status == 204) return setReports([])
                setReports(response.data.reports);


                setIsReportsLoading(false)

            }catch(err){
                setReports([])
                setIsReportsLoading(false)
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            }
        }

        const fetchFeedbacks = async() => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/feedback/${0}/${undefined}`, config)

                if(response.status === 204) return setFeedbacks([])
                setFeedbacks(response.data.feedbacks)

                setIsFeedbackLoading(false)

            }catch(err){
                setFeedbacks([])
                setIsFeedbackLoading(false)
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            };
        };

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
        <div classclassName="main-container container-fluid d-flex flex-column justify-content-start" style={{maxWidth : '3000px'}}>

            {toggleCreateNew ? <div className="bg"><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct setToggleCreateNew={setToggleCreateNew}/></div> : <></> }
            {toggleDeleteReport.status ? <div className="bg"><div className="delete-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleDeleteReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><DeleteReport setToggleDeleteReport={setToggleDeleteReport} toggleDeleteReport={toggleDeleteReport} setReports={setReports}/></div> : <></> }
            {toggleRespondReport.status ? <div className="bg"><div className="respond-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleRespondReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><RespondReport setToggleRespondReport={setToggleRespondReport} toggleRespondReport={toggleRespondReport} setReports={setReports}/></div> : <></> }
            {toggleManageAdmins ? <div className="bg"><div className="manage-admins-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleManageAdmins(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><ManageAdmins setToggleManageAdmins={setToggleManageAdmins} setAdmins={setAdmins} admins={admins}/></div> : <></>}
                
                <div className="main-body">
                        
                    <div className="main-start">
                        <Sidebar />
                    </div>

                    <div className="main-end">
                    <AdminHeader onClick={() => setToggleCreateNew(true)}/>

                    {isLoading ? 'loading skeleton' : <AdminList admins={admins} setToggleManageAdmins={setToggleManageAdmins}/>}
                    {/* add charts for products **/}
                    {/* fetch counts of orders and sold items  */}
                    {/* add recent activities component on side */}

                        <section id="manage-products">

                            {isLoading ? 'loading skeleton' : <ManageOrders orders={orders} setOrders={setOrders}/>}

                        </section>

                        <section id="reports">
                            {isReportsLoading ? 'loading'  : <>

                                <h1>Reports</h1>
                                
                                <Link to={'/admin-dashboard/reports'}>Visit</Link>
                                {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No reports'}

                            </>}
                        </section>

                        <section id="feedbacks">
                            {isFeedbackLoading ? 'loading' : <>

                                <h1>Feedbacks</h1>

                                <Link to={'/admin-dashboard/feedbacks'}>Visit</Link>
                                {feedbacks?.length !== 0 ? feedbacks?.map((feedback, feedbackId) => (
                                    <AdminFeedback feedback={feedback} feedbackId={feedbackId} key={feedbackId} setFeedbacks={setFeedbacks}/>
                                )) : "No Feedbacks"}
                            
                            </>}
                        </section>

                    </div>
                </div>
            
        </div>
    )
}

export default AdminDashboard