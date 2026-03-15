import { Link } from "react-router-dom";

const Report = ( { report, reportId ,key, setToggleDeleteReport, setToggleRespondReport } ) => {
    return(
        <div className="report-container d-flex justify-content-between" key={reportId}>
            <div className="report-start">
                <span>{report.fullname} {report.email} {report.content}</span>
                <br />  
                <span>{report?.type == 'Product' ? <div>Reported Product : <Link to={`/product/${report.product_id}`}>{report.title}</Link></div> : <></>}</span>
            </div>
            <div className="report-end d-flex flex-column">
                <button onClick={() => setToggleDeleteReport({status : true, reportDetails : report})}>Delete</button>
                <button onClick={() => setToggleRespondReport({status : true, reportDetails : report})}>Respond</button>
            </div>
        </div>
    );
};


export default Report