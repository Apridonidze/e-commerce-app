import axios from "axios"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useRef, useState, useEffect } from "react"

import { BACKEND_URL } from "../../../config"

import SmallReport from "../../components/report/SmallReport"

const RespondReport = ({ setToggleRespondReport, toggleRespondReport, setToggleAlert ,setReports }) => {

    const [ cookies ] = useCookies(['token'])

    const [targetReport, setTargetReport] = useState(null)
    const [selectReason, setSelectReason] = useState('')

    const btnRef = useRef(null);

    useEffect(() => {
        setTargetReport(toggleRespondReport?.reportDetails)
    },[])

    useEffect(() => {

        if(!btnRef.current)return
        if(selectReason === '') btnRef.current.disabled = true

        btnRef.current.disabled = false;

    },[selectReason])

    const handleRespondReport = async() => {

        if(!selectReason) return btnRef.current.disable = true

        try{

            const response = await axios.put(`${BACKEND_URL}/api/report/${toggleRespondReport.reportDetails.id}`, {selectReason, status : "Responded"} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            console.log(response)

            if(response.status === 200) setReports(prev => prev.map(report => report.id == response.data.reportId? { ...report, status: "Responded" }: report));

            // add 400 status code handling

        }catch(err){
            console.log(err)
            // toggle alert message
        }

    } 

    const selects = [
        { title : "Content Removed" ,code: "Content Removed (Valid)", label: "Your report was valid and the reported content has been removed" },
        { title : "Listing Edited" ,code: "Listing Edited (Valid)", label: "Your report was valid and the listing has been edited to resolve the issue" },
        { title : "No Violation" ,code: "No Violation (Valid)", label: "Your report was reviewed but no violation was found" },
        { title : "Duplicate" ,code: "Duplicate (Valid)", label: "This report was marked as duplicate" },
        { title : "Already Fixed" ,code: "Already Fixed (Valid)", label: "The issue was already resolved before review" },
        { title : "Other" ,code: "Other (Valid)", label: "Thank you for your report – the issue has been resolved" }
    ]

    return(
        <div className="manage-report-container p-3 w-auto" style={{zIndex : 999}}>

            <div className="manage-report-top d-flex align-items-center justify-content-between">
                <h1>Respond to Report</h1>
                <button className="btn border-0" onClick={() => setToggleRespondReport({status :false, reportDetails : null})}><i className="fa-solid fa-xmark fs-5"></i></button>
            </div>

            <div className="manage-report-main w-100 my-3">
                <SmallReport reportDetails={toggleRespondReport.reportDetails}/>
            </div>

            <div className="manage-report-bottom">
                <h4>Response templates</h4>
                <div className="select row gap-2 px-2">
                    {selects.map((res, id) => <span className={`py-1 rounded-3 fs-6 selectOption ${selectReason == res.code ? 'active' : ''}`} key={id} onClick={() => setSelectReason(res.code)}>{res.title}</span>)}
                </div>
            </div>
            <span className="warning">*This reason will be logged in the system and sent to reporter via automated mail sender.</span>

            <div className="manage-report-buttons">
                <button className="btn w-auto" onClick={() => setToggleRespondReport({status : false , reportDetails : null})}>Cancle</button>
                <button className="btn" onClick={() => handleRespondReport()} disabled={!selectReason ? true : false} ref={btnRef}>Delete</button>
            </div>
        </div>
    )
}

export default RespondReport;