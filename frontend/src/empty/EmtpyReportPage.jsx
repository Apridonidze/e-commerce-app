const EmptyReportPage = () => {
    return(
        <div className="empty-reports-container">
            <i class="fa-solid fa-flag rounded-3"></i>
            <h4>No data to display</h4>
            <h6>Reports will appear here once your store starts generating activity like sales, orders, or traffic.</h6>
        </div>
    );
};

export default EmptyReportPage;