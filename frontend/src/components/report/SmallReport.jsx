const SmallReport = ({ reportDetails }) => { //importing proprs from parent element (DeleteReport.jsx || RespondReport.jsx)
    return(
        <div className="report-container d-flex flex-column rounded-3" style={{border : '1px solid rgba(8, 15, 32, 0.15)'}} key={reportDetails.report_id}>
            
            <div className="report-top d-flex justify-content-between py-3">

                <div className="report-user-initials w-auto">

                    <div className="initials d-flex">
                        <span className="userInitials text-uppercase me-2">{reportDetails.user_fullname.split(' ')[0].at(0)}{reportDetails.user_fullname.split(' ')[1].at(0)}</span>
                        <div className="d-flex flex-column">
                            <span className="fs-5 fw-bold">{reportDetails.user_fullname}</span>
                            <span>{reportDetails.user_email}</span>
                        </div>
                    </div>

                </div>

                <div className="user-data d-flex align-items-center w-auto flex-row gap-5 justify-content-between me-3">
                    <span className="type px-3 fs-6 rounded-3">{reportDetails.type}</span>
                    <span className={`status ${reportDetails.status}`}><i class="statusDot fa-solid fa-circle"></i> {reportDetails.status}</span>
                </div>
           
            </div>

            <div className="report-bottom">

                <div className="report-bottom-answer">    
                    <h6 className="text-secondary ms-2">{!reportDetails.content ? "No Editorial Text." : `"${reportDetails.content.length > 80 ? `${reportDetails.content.slice(0,80)}...` : reportDetails.content}"`}</h6>
                </div>

                <div className="report-bottom-resolution mt-3 d-flex align-items-center justify-content-between">
                    <h6 style={{fontSize : '14px'}} className="text-secondary"> {!reportDetails.resolution_action ? <span className="pendingAction py-1 px-2 rounded-3">Pending Action</span> : <span className="resolvedAction  py-1 px-2 rounded-3 me-2">Resolved</span> } {reportDetails.resolution_action ? <span className="text-secondary"><b>Actioned By : </b>{reportDetails.admin_email}</span> : <span className="text-secondary ms-2">Waiting For Supports Action</span>}</h6>

                    <h6 className="text-secondary" style={{fontSize : '14px'}}>{reportDetails.resolution_action ? new Date('2026-03-25T08:11:53.000Z').toLocaleDateString() : <></>}</h6>
                </div>
            
            </div>
        </div>
    );
};

export default SmallReport; //exporting component