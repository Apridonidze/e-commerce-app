const Report = ( { report, reportId ,key } ) => {
    return(
        <div className="report-container" key={reportId}>
            <span>{report.fullname} {report.email} {report.content}</span>
            <br />
            <span>{report?.type == 'Product' ? <div>Reported Product : {report.product_id}</div> : <></>}</span>
        </div>
    );
};


export default Report