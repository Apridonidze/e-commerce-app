import { Link } from "react-router-dom"; //importing react library

import Report from "../../../components/report/Report";
import EmptyReports from "../../../empty/EmptyReports"; //importing react components

const ManageReports = ({ reports , setToggleDeleteReport , setToggleRespondReport }) => { //importing proprs from parent componetn AdminDashboard.jsx
    return(
        <div className="manage-reports-container mt-5">
            
            <div className="manage-reports-header d-flex align-items-center gap-2 mb-3">
                <h3><i class="fa-solid fa-flag fs-3" style={{color : '#10b981'}}></i> Reports</h3>
                <Link to={'/admin-dashboard/reports/Sent'}><i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
            </div>

            <div className="manage-reports-main-body d-flex flex-column gap-3">
                {reports?.length > 0 ? reports?.filter(report => report.status == "Sent").map(report => <Report report={report} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : <EmptyReports />}
            </div>

        </div>
    );
};

export default ManageReports; //exporting component