const Report = ( { report, reportId ,key } ) => {
    return(
        <div className="report-container" key={reportId}>
            <span>{report.id}|{report.fullname} {report.email} {report.content}. Product Reported : {report.product_id}</span>{/**check if report.product_id is not null (if product_id does not exists then user reported our platform and not product) */}
        </div>
    );
};


export default Report