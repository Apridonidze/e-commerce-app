import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useRef, useState } from "react"; //importing react hooks
import { BACKEND_URL } from "../../../config"; //importing backend url from config file
import SmallReport from "../../components/report/SmallReport";

const DeleteReport = ({ setToggleDeleteReport, toggleDeleteReport, setReports, setToggleAlert }) => { //importing props from parent component (AdminDashbaord.jsx)

    const btnRef = useRef(null); //ref for delete button to enable once admin filles out all inputs
    const [ cookies ] = useCookies(['token']); //definign user cookies
    
    const [selectReason, setSelectReason] = useState(''); //state to select reason of reports deletion
    const reasons = [
        { label: "Valid Report – Content Removed", value: "Content Removed (Valid)", type: "valid" },
        { label: "Valid Report – Listing Edited", value: "Listing Edited (Valid)", type: "valid" },
        { label: "Invalid Report – No Violation", value: "No Violation (Invalid)", type: "invalid" },
        { label: "Duplicate Report", value: "Duplicate (Invalid)", type: "invalid" },
        { label: "Resolved – Already Fixed", value: "Already Fixed (Invalid)", type: "invalid" },
        { label: "Other Action Taken", value: "Other (Invalid)", type: "invalid" }
    ];//array of select options

    const handleDeleteReport = async() => {

        if(!selectReason) return btnRef.current.disabled = true

        try{

            const response = await axios.put(`${BACKEND_URL}/api/report/${toggleDeleteReport.reportDetails.id}`, {selectReason, status : "Removed"} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            setReports(prev => prev.map(report => report.id == response.data.reportId? { ...report, status: "Removed" }: report));
            setToggleDeleteReport({status  :false , reportDetails : null})
            return setToggleAlert({status: true, type: "Success", statusCode: 200, message: response.data.message}); //toggling error message


        }catch(err){
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        }
    }

    return(
        <div className="manage-report-container p-3 w-auto" style={{zIndex : 999}}>
            <div className="manage-report-top d-flex align-items-center justify-content-between">
                <h1>Delete user's Report</h1>
                <button className="btn border-0" onClick={() => setToggleDeleteReport({status :false, reportDetails : null})}><i className="fa-solid fa-xmark fs-5"></i></button>
            </div>

            <div className="manage-report-main w-100 my-3">
                <SmallReport reportDetails={toggleDeleteReport.reportDetails}/>
            </div>

            <div className="manage-report-bottom">
                <h4>Reason of report deletion</h4>
                <div className="select row gap-2 px-2">
                    {reasons.map((res, id) => <span className={`py-1 rounded-3 fs-6 selectOption ${selectReason == res.value ? 'active' : ''}`} key={id} onClick={() => setSelectReason(res.value)}>{res.label}</span>)}
                </div>
            </div>
            <span className="warning mb-4 mt-2">*This reason will be logged in the system and sent to reporter via automated mail sender.</span>

            <div className="manage-report-buttons">
                <button className="btn w-auto" onClick={() => setToggleDeleteReport({status : false , reportDetails : null})}>Cancle</button>
                <button className="btn" onClick={() => handleDeleteReport()} disabled={!selectReason ? true : false} ref={btnRef}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteReport; //exporting component