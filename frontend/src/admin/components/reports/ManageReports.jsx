import { Link } from "react-router-dom";
import Report from "../../../components/report/Report";

const ManageReports = ({ reports , setToggleDeleteReport , setToggleRespondReport }) => {
    return(
        <div className="manage-reports-container mt-5">
            
            <div className="manage-reports-header d-flex align-items-center gap-2 mb-3">
                <h3><i class="fa-solid fa-flag fs-3" style={{color : '#10b981'}}></i> Reports</h3>
                <Link to={'/admin-dashboard/reports'}><i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
            </div>

                <div className="manage-reports-main-body d-flex flex-column gap-3">
                    {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map(report => <Report report={report} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'Empty reports state'}
                </div>

        </div>
    )
}

export default ManageReports