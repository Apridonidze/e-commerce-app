import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useRef, useState } from "react"; //importing react hooks
import { BACKEND_URL } from "../../../config"; //importing backend url from config file
import SmallReport from "../../components/report/SmallReport";

const DeleteReport = ({ setToggleDeleteReport, toggleDeleteReport, setReports }) => { //importing props from parent component (AdminDashbaord.jsx)

    const btnRef = useRef(null); //ref for delete button to enable once admin filles out all inputs
    const [ cookies ] = useCookies(['token']); //definign user cookies
    
    const [selectReason, setSelectReason] = useState(''); //state to select reason of reports deletion
    const reasons = [
        { label: "Valid Report – Content Removed", value: "Content Removed", type: "valid" },
        { label: "Valid Report – Listing Edited", value: "Listing Edited", type: "valid" },
        { label: "Invalid Report – No Violation", value: "No Violation", type: "invalid" },
        { label: "Duplicate Report", value: "Duplicate", type: "invalid" },
        { label: "Resolved – Already Fixed", value: "Already Fixed", type: "invalid" },
        { label: "Other Action Taken", value: "Other", type: "invalid" }
    ]; //array of select options

    useEffect(() => {

        if(!btnRef.current) return null; //returning null if btnRef.current is undefined
        if(selectReason === '') btnRef.current.disabled = true ; //disabling button if selected Reason if empty

        btnRef.current.disabled = false; //un

    },[selectReason])

    const handleDeleteReport = async() => {

        if(!selectReason) return btnRef.current.disable = true

        try{

            const response = await axios.put(`${BACKEND_URL}/api/report/${toggleDeleteReport.reportDetails.id}`, {selectReason, status : "Removed"} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            

            if(response.status === 200) setReports(prev => prev.map(report => report.id == response.data.reportId? { ...report, status: "Removed" }: report));
            
            // add 400 status code handling

        }catch(err){
            console.log(err)
            // toggle alert message
        }

    }

    return(
        <div className="manage-report-container py-3 px-3 mx-auto w-100" style={{zIndex : 999}}>
            <div className="manage-report-top d-flex align-items-center justify-content-between">
                <h1>Delete Users Report</h1>
                <button className="btn border-0" onClick={() => setToggleDeleteReport({status :false, reportDetails : null})}><i className="fa-solid fa-xmark fs-5"></i></button>
            </div>

            <div className="manage-report-main my-3">
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
                <button className="btn" onClick={() => handleDeleteReport()} ref={btnRef}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteReport; //exporting component