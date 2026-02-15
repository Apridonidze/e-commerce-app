import Skeleton from "react-loading-skeleton"

import Report from "./Report"

const Reports = ({ reports }) => {
    return(
        <div className="reports-container">
            <h1>Reports</h1>
            {reports?.map((report, reportId) => <Report report={report} reportId={reportId} key={reportId}/>) || <Skeleton />}
        </div>
    )
}

export default Reports