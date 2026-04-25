import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { BACKEND_URL } from "../../config";

import Sidebar from "../layout/Sidebar";
import Report from "../components/report/Report";
import DeleteReport from "../admin/components/DeleteReport";
import RespondReport from "../admin/components/RespondReport";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


const Reports = () => {

    const navigator = useNavigate();
    const { reportStatus } = useParams();

    const [ cookies ] = useCookies(['token'])

    const [reports, setReports] = useState([])
    const [offset, setOffset] = useState(0)

    const [toggleDeleteReport, setToggleDeleteReport] = useState({status : false, reportDetails : null});
    const [toggleRespondReport, setToggleRespondReport] = useState({status : false, reportDetails : null});

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    const allowedParams = ['Sent' , 'Responded', 'Removed']

    const fetchReports = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/report/report-list/${offset}/${reportStatus}`,
                config
            );

            if (response.status === 204) return;

            setReports(prev => [...prev, ...response.data.reports]);
            setOffset(prev => prev + response.data.reports.length);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setReports([]);
        setOffset(0);
        fetchReports();
    }, [reportStatus]);

    
   
    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 

            {toggleDeleteReport.status ? <div><div className="delete-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleDeleteReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><DeleteReport setToggleDeleteReport={setToggleDeleteReport} toggleDeleteReport={toggleDeleteReport} setReports={setReports}/></div> : <></> }
            {toggleRespondReport.status ? <div><div className="respond-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleRespondReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><RespondReport setToggleRespondReport={setToggleRespondReport} toggleRespondReport={toggleRespondReport} setReports={setReports}/></div> : <></> }

            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
         
                <div className="main-end">

                    <div className="main-header">
                        <Header />
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">

                            <div className="order-page-header-start"><button className="return d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() => {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button></div>
                            
                            <div className="order-page-header-end d-flex gap-2 align-items-center">
                                {allowedParams.map(param => 
                                    <NavLink to={`/admin-dashboard/reports/${param}`} className={({ isActive }) => isActive ? "active-order" : ""}>{param}</NavLink>
                                    
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="reports-main d-flex flex-column gap-2">
                            <h1>{} Reports</h1>
                            {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No Unanswered reports'}
                            {reports?.filter(report => report.status == "Sent").length % 5 !== 0 || reports?.filter(report => report.status == "Responded").length === 0 ? <span>No More Unanswred Reports</span> : <button onClick={() => fetchReports()}>Load More...</button>}
                        
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Reports; //exporting component