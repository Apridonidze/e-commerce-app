const ManageReports = ({ reports , setToggleDeleteReport , setToggleRespondReport }) => {
    return(
        <div className="manage-reports-container">
            <h1>Reports</h1>
                                
            <Link to={'/admin-dashboard/reports'}>Visit</Link>
            {reports?.length !== 0 ? reports?.filter(report => report.status == "Sent").map((report,reportId) => <Report report={report} reportId={reportId} key={reportId} setToggleDeleteReport={setToggleDeleteReport} setToggleRespondReport={setToggleRespondReport}/>) : 'No reports'}

        </div>
    )
}

export default ManageReports