import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import AdminList from '../admin/components/AdminList'
import CreateProduct from "../admin/components/CreateProduct"
import DeleteReport from "../admin/components/DeleteReport"
import RespondReport from "../admin/components/RespondReport"
import StatusMessage from "../alerts/StatusMessage"
import ManageAdmins from "../admin/components/ManageAdmins"

import '../styles/dashboard.css'
import '../styles/admin.dashboard.css'

import AdminHeader from "../admin/components/AdminHeader"
import ManageOrders from "../admin/components/orders/ManageOrders"
import ManageReports from "../admin/components/reports/ManageReports"
import ManageFeedbacks from "../admin/components/feedbacks/ManageFeedbacks"
import Footer from "../layout/Footer"
import Analytics from "../components/analytics/Analytics"
import LowStock from "../admin/components/LowStock"

import EditProduct from "../admin/components/EditProduct"
import RemoveProduct from "../admin/components/RemoveProduct"
import ReportProduct from "../components/report/ReportProduct"

const AdminDashboard = () => {

    const { hash } = useLocation();
    const [ cookies ] = useCookies(['token'])

    const [ admins, setAdmins ] = useState(null)
    const [ orders,  setOrders ] = useState([])
    const [ reports , setReports ] = useState([])
    const [ feedbacks, setFeedbacks ] = useState([])
    const [ lowStock , setLowStock ] = useState([]) 

    const [chartsDate, setChartsDate ] = useState('Month');
    const [chartsData, setChartsData] = useState([])

    const [toggleCreateNew, setToggleCreateNew] = useState(false);
    const [toggleManageAdmins ,setToggleManageAdmins] = useState(false);
    const [toggleDeleteReport, setToggleDeleteReport] = useState({status : false, reportDetails : null});
    const [toggleRespondReport, setToggleRespondReport] = useState({status : false, reportDetails : null});
    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, product: null});
    const [toggleAddToCart ,setToggleAddToCart] = useState({status : false, product: null});
    const [toggleReportProduct, setToggleReportProduct] = useState({status : null, productId: null});

    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const [reportsOffset, setReportsOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isChartsLoading , setIsChartsLoading] = useState(true)
    const [isReportsLoading , setIsReportsLoading] = useState(true);
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(true)
    const [ isLowStockLoading , setIsLowStockLoading] = useState(true);

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`, config)
                const data = [...response.data.pending, response.data.onWay, response.data.delivered].filter((arr) => arr.length !== 0).flat()
                
                setOrders(data)
                setAdmins({onlineAdmins : response.data.onlineAdmins , offlineAdmins : response.data.offlineAdmins})

                setIsLoading(false);

            } catch (err) {

                setOrders([]);
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

        const fetchLowStockItems = async() => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/low-stock/${0}`, config)
                
                setIsLowStockLoading(false)
                if(response.status === 204) return setLowStock([]);

                setLowStock(response.data.items)

            }catch(err){
                setIsLowStockLoading(false)
                setLowStock([])
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            }
        } 

        return () => {
            fetchStatus();
            fetchReports();
            fetchFeedbacks();
            fetchLowStockItems();
        }

    }, []);

    useEffect(() => {

        // check if chartsDate is valid , if not return empty promise

        const allowedTypes = ['Week' , "Month"];
        
        if(!allowedTypes.includes(chartsDate)) {
            setIsChartsLoading(false)
            setChartsDate([])
            return
        };
        

        const fetchCharts = async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/charts/${chartsDate}`, config)
                setIsChartsLoading(false)
                setChartsData(response.data)

            }catch(err){
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
                setIsChartsLoading(false)
                setChartsData([])
            }
        }

        fetchCharts();

    }, [chartsDate])

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} return;
    }, [hash]);

    return(
        <div classclassName="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>

            {toggleRemove.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleRemove({status : false, product  :null})}></div><RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove} setToggleAlert={setToggleAlert}/></> : <></> }
            {toggleReportProduct.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleReportProduct({status : false, productId  :null})}></div><ReportProduct setToggleReportProduct={setToggleReportProduct} toggleReportProduct={toggleReportProduct} setToggleAlert={setToggleAlert}/></> : <></>}
            
            {toggleAddToCart.status ? <div className="add-to-cart-wrapper" style={{top : `${window.scrollY}px`}}><div className="add-to-cart-background" style={{top : `${window.scrollY}px`}} onClick={() => setToggleAddToCart({status : false , product : null})}></div> <AddToCart setToggleAddToCart={setToggleAddToCart} toggleAddToCart={toggleAddToCart} setToggleAlert={setToggleAlert}/></div> : <></>}

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            {toggleEdit.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleEdit({status : false, product  :null})}></div> <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} setToggleAlert={setToggleAlert}/> </> : <></> }

            {toggleCreateNew ? <div className="bg"><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct setToggleCreateNew={setToggleCreateNew}/></div> : <></> }
            {toggleDeleteReport.status ? <div className="bg"><div className="delete-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleDeleteReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><DeleteReport setToggleDeleteReport={setToggleDeleteReport} toggleDeleteReport={toggleDeleteReport} setReports={setReports}/></div> : <></> }
            {toggleRespondReport.status ? <div className="bg"><div className="respond-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleRespondReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><RespondReport setToggleRespondReport={setToggleRespondReport} toggleRespondReport={toggleRespondReport} setReports={setReports}/></div> : <></> }
            {toggleManageAdmins ? <div className="bg"><div className="manage-admins-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleManageAdmins(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><ManageAdmins setToggleManageAdmins={setToggleManageAdmins} setAdmins={setAdmins} admins={admins} setToggleAlert={setToggleAlert}/></div> : <></>}
                
            <div className="main-body ">
                        
                <div className="main-start"><Sidebar /></div>

                <div className="main-end">

                    <div className="main-header"><AdminHeader onClick={() => setToggleCreateNew(true)}/></div>

                    {isLoading ? 'loading skeleton' : <AdminList admins={admins} setToggleManageAdmins={setToggleManageAdmins}/>}
                    {isChartsLoading ? 'loading skeleton' : chartsData.length === 0 ? "Empty Charts" : <Analytics setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/>}

                    <section id="manage-products">{isLoading ? 'loading skeleton' : <ManageOrders orders={orders} setOrders={setOrders} setToggleAlert={setToggleAlert}/>}</section>
                    {isLowStockLoading ? 'loading skeleton' : <LowStock lowStock={lowStock} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setToggleReportProduct={setToggleReportProduct} setToggleAddToCart={setToggleAddToCart} setToggleAlert={setToggleAlert}/>}
                    <section id="reports">{isReportsLoading ? 'loading skeleton'  : <ManageReports reports={reports} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport} />}</section>
                    <section id="feedbacks">{isFeedbackLoading ? 'loading' : <ManageFeedbacks setFeedbacks={setFeedbacks} feedbacks={feedbacks}/>}</section>

                </div>
            </div>

            <Footer />
            
        </div>
    );
};


// add section where low onstock items will be displayed
// add separate page for it 


// add error message toggle
// create reusable component to submit deletion of orders/admin/report/feedback
// create loading skeleton for each section with empty states
// style togglable itemns
// cleanup code


export default AdminDashboard