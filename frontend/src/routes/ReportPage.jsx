import Sidebar from "../layout/Sidebar"

const ReportPage = () => {
    return(
        <div className="report-page-container d-flex">
            <Sidebar />
            <div className="report-main-container">
                <div className="report-header">
                    <h1>Report</h1>
                    <h4>Help us maintain the integrity of the Curator ecosystem. Detailed reports allow our developer's team to resolve disputes and technical erros with precision</h4>
                </div>
                <div className="report-input-container">
                    <h4>Select Primary Reason : </h4>
                    
                </div>
                <div className="report-footer">

                </div>
            </div>
        </div>
    )
}

export default ReportPage