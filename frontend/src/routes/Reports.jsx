import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const Reports = () => {
    return(
        <div className="reports-container d-flex">
            <Sidebar />
            <div className="reports-main-container w-100">
                <div className="reports-header d-flex justify-content-between  border">
                    <Link to={'/admin-dashboard'} >Prev Url</Link>
                    <h4>Reports</h4>
                </div>
                <div className="reports-main">
                    <section id="#Unanswered-Reports"></section>
                    <section id="#Answered-Reports"></section>
                    <section id="#Deleted-Reports"></section>
                </div>
            </div>
        </div>
    )
}

export default Reports;