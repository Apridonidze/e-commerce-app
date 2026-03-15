import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { BACKEND_URL } from "../../config";

import Sidebar from "../layout/Sidebar";
import Report from "../component/Report";
import DeleteReport from "../component/DeleteReport";
import RespondReport from "../component/RespondReport";


const Reports = () => {

    const [ cookies ] = useCookies(['token'])

    const [reports, setReports] = useState([])
    const [offsets, setOffsets] = useState({Sent : 0 , Responded: 0 , Removed : 0})

    const [toggleDeleteReport, setToggleDeleteReport] = useState({status : false, reportDetails : null});
    const [toggleRespondReport, setToggleRespondReport] = useState({status : false, reportDetails : null});

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    const fetchReports = async(status) => {
        try {

            const offset = offsets[status];
            const response = await axios.get(`${BACKEND_URL}/api/report/report-list/${offset}/${status}`,config);

            if (response.status === 204) return;

            setReports(prev => [...prev, ...response.data.reports]);
            setOffsets(prev => ({...prev,[status]: prev[status] + response.data.reports.length}));

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {fetchReports()},[offsets])
   
    return(
        <div className="reports-container d-flex">

            {toggleDeleteReport.status ? <div><div className="delete-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleDeleteReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><DeleteReport setToggleDeleteReport={setToggleDeleteReport} toggleDeleteReport={toggleDeleteReport}/></div> : <></> }
            {toggleRespondReport.status ? <div><div className="respond-report-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleRespondReport({status : false, reportDetails : null})} style={{backgroundColor : 'black'}} tabIndex={999}></div><RespondReport setToggleRespondReport={setToggleRespondReport} toggleRespondReport={toggleRespondReport}/></div> : <></> }

            <Sidebar />
            <div className="reports-main-container w-100">
                <div className="reports-header d-flex justify-content-between  border">
                    <Link to={'/admin-dashboard'} >Prev Url</Link>
                    <h4>Reports</h4>
                </div>
                <div className="reports-main">
                    <section id="#Unanswered-Reports">
                        <h1>Unanswered Reports</h1>
                        {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No Unanswered reports'}
                        <button onClick={() => fetchReports("Sent")}>Load More...</button>
                    </section>
                    <section id="#Answered-Reports">
                        <h1>Answered Reports</h1>
                        {reports?.length !== 0 ? reports?.filter(report => report.status == "Responded").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No Responded reports'}
                        <button onClick={() => fetchReports("Responded")}>Load More...</button>
                    </section>
                    <section id="#Deleted-Reports">
                        <h1>Deleted Reports</h1>
                        {reports?.length !== 0 ? reports?.filter(report => report.status == "Removed").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No Deleted reports'}
                        <button onClick={() => fetchReports("Removed")} >Load More...</button>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Reports;