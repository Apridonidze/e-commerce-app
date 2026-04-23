import { Link } from "react-router-dom";//importing react library

const EmptyReports = () => {
    return(
        <div className="empty-reports-container">
            <i class="fa-solid fa-flag rounded-3"></i>
            <h4>No data to display</h4>
            <h6>Reports will appear here once your store starts generating activity like sales, orders, or traffic.</h6>
            <Link to='/admin-dashboard/reports'><i class="fa-solid fa-clock-rotate-left"></i>Go to reports history</Link>
        </div>
    );
};

export default EmptyReports; //exporting components