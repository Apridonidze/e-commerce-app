import Skeleton from "react-loading-skeleton"

const Reports = ({ reports }) => {
    return(
        <div className="reports-container">
            <h1>Reports</h1>
            {reports?.map((report, reportId) => <h1>{report.content}</h1>) || <Skeleton />}
        </div>
    )
}

export default Reports