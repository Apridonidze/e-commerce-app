import { Link } from "react-router-dom";

const Report = ( { report, reportId ,key } ) => {
    return(
        <div className="report-container" key={reportId}>
            <span>{report.fullname} {report.email} {report.content}</span>
            <br />  
            <span>{report?.type == 'Product' ? <div>Reported Product : <Link to={`/product/${report.product_id}`}>{report.title}</Link></div> : <></>}</span>
        </div>
    );
};


export default Report