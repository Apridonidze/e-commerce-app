import { Link } from "react-router-dom"; //importing react librarry

const Report = ( { report, setToggleDeleteReport, setToggleRespondReport } ) => { //importing props from parent component (ManageReports.jsx)
    return(
        <div className="report-container d-flex flex-column rounded-3 px-3 py-2" key={report.report_id}>
            
            <div className="report-top d-flex justify-content-between py-3">

                <div className="report-user-initials w-auto">

                    <div className="initials"><span className="userInitials text-uppercase me-2">{report.user_fullname.split(' ')[0].at(0)}{report.user_fullname.split(' ')[1].at(0)}</span>
                    <span className="fs-5 fw-bold">{report.user_fullname}</span></div>

                    <div className="toggle-report-button gap-1">
                        <button className="replyBtn btn border-0 py-2" onClick={() => setToggleRespondReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' || report.status == 'Responded' ? true : false } ><i class="fa-solid fa-reply"></i></button> 
                        <button className="deleteBtn btn border-0 py-2" onClick={() => setToggleDeleteReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' ? true : false}><i class="fa-solid fa-trash-can"></i></button>
                    </div>

                </div>

                <div className="user-data d-flex align-items-center w-50 gap-5 justify-content-between me-3">
                    <span>{report.user_email}</span>
                    <span className="type px-3 fs-6 rounded-3">{report.type}</span>
                    <span className={`status ${report.status}`}><i class="statusDot fa-solid fa-circle"></i> {report.status}</span>
                </div>
                
                <div className="report-end d-flex gap-1">
                    <button className="replyBtn btn border-0 py-2" onClick={() => setToggleRespondReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' || report.status == 'Responded' ? true : false } ><i class="fa-solid fa-reply"></i></button> 
                    <button className="deleteBtn btn border-0 py-2" onClick={() => setToggleDeleteReport({status : true, reportDetails : report})} disabled={report.status == 'Removed' ? true : false}><i class="fa-solid fa-trash-can"></i></button>
                </div>

            </div>

            <div className="report-bottom">

                <div className="report-bottom-answer">    
                    <h6 className="text-secondary">{!report.content ? "No Editorial Text." : `"${report.content.length > 80 ? `${report.content.slice(0,80)}...` : report.content}"`}</h6>
                    {report.type == "Product" ? <span className="url px-2 pt-2 fs-5 fw-bold"><Link to={`/product/${report.product_id}`}>{report.title}</Link></span> : <></>}
                </div>

                <div className="report-bottom-resolution mt-3 d-flex align-items-center justify-content-between">
                    <h6 style={{fontSize : '14px'}} className="text-secondary"> {!report.resolution_action ? <span className="pendingAction py-1 px-2 rounded-3">Pending Action</span> : <span className="resolvedAction  py-1 px-2 rounded-3 me-2">Resolved</span> } {report.resolution_action ? <span className="text-secondary"><b>Actioned By : </b>{report.admin_email}</span> : <span className="text-secondary ms-2">Waiting For Supports Action</span>}</h6>

                    <h6 className="text-secondary" style={{fontSize : '14px'}}>{report.resolution_action ? new Date('2026-03-25T08:11:53.000Z').toLocaleDateString() : <span className="asignToMe" onClick={() => setToggleRespondReport({status : true, reportDetails : report})}>Assign to me</span>}</h6>
                </div>
            
            </div>
        </div>
    );
};

export default Report;///exportingm component