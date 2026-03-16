import ReportInput from "../component/ReportInput"
import Sidebar from "../layout/Sidebar"

const ReportPage = () => {
    return(
        <div className="report-page-container d-flex">
            <Sidebar />
            <div className="report-main-container">
                <ReportInput />
            </div>
        </div>
    )
}

export default ReportPage