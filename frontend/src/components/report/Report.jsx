import { Link } from "react-router-dom";

const Report = ( { report, setToggleDeleteReport, setToggleRespondReport } ) => {
    console.log(report)
    return(
        <div className="report-container d-flex flex-column rounded-3 p-2" key={report.report_id}>
            
            <div className="report-top d-flex justify-content-between py-3">

                <div className="report-user-initials">
                    <span className="userInitials text-uppercase me-2">{report.user_fullname.split(' ')[0].at(0)}{report.user_fullname.split(' ')[1].at(0)}</span>
                    <span className="fs-5 fw-bold">{report.user_fullname}</span>
                </div>

                <span>{report.user_email}</span>
                <span>{report.type}</span>
                <span>{report.status}</span>
                
                <div className="report-end d-flex gap-1">
                    <button className="replyBtn btn border-0 py-2" onClick={() => setToggleRespondReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' || report.status == 'Responded' ? true : false } ><i class="fa-solid fa-reply"></i></button> 
                    <button className="deleteBtn btn border-0 py-2" onClick={() => setToggleDeleteReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' ? true : false}><i class="fa-solid fa-trash-can"></i></button>
                </div>

            </div>

            <div className="report-bottom">
                <div className="report-bottom-answer">
                    
                    <h6 className="text-secondary">{!report.content ? "No Editorial Text." : `"${report.content.length > 80 ? `${report.content.slice(0,80)}...` : report.content}"`}</h6>
                </div>
                <div className="report-bottom-resolution d-flex align-items-center justify-content-between">
                    <h6 className="text-secondary"> {!report.resolution_action ? <span className="pendingAction">Pending Action</span> : <span className="resolvedAction">Resolved</span> } {report.resolution_action ? report.admin_email : 'Waiting For Supports Action'}</h6>
                    <h6>{report.resolution_action ? report.resolved_by : <span className="asignToMe" onClick={() => setToggleRespondReport({status : true, reportDetails : report})}>Assign to me</span>}</h6>
                </div>
            </div>
        </div>
    );
};


export default Report