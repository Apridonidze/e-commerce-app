import { useLocation, useParams } from "react-router-dom"

const ReportInput = () => {

    const type = useLocation();
    console.log(type)

    // finish component

    return(
        <div className="report-input-container">
        report input
        </div>
    )
}

export default ReportInput