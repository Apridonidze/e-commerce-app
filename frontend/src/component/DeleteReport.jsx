import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const DeleteReport = ({ setToggleDeleteReport, toggleDeleteReport }) => {

    const [ cookies ] = useCookies(['token'])

    const [targetReport, setTargetReport] = useState(null)
    const [selectReason, setSelectReason] = useState('')

    const btnRef = useRef(null);

    useEffect(() => {
        setTargetReport(toggleDeleteReport?.reportDetails)
    },[])

    useEffect(() => {

        if(!btnRef.current)return
        if(selectReason === '') btnRef.current.disabled = true

        btnRef.current.disabled = false;

    },[selectReason])

    const handleDeleteReport = async() => {

        if(!selectReason) return btnRef.current.disable = true

        try{

            const response = await axios.post(`${BACKEND_URL}/api/report/${toggleDeleteReport.reportDetails.product_id}`, {selectReason} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            console.log(response)
            // add 400 status code handling

        }catch(err){
            console.log(err)
            // toggle alert message
        }

    }

    return(
        <div className="delete-report-container position-fixed bg-white w-50 h-50" style={{zIndex : 999}}>
            <div className="delete-report-top">
                <h1>Delete Users Report</h1>
                <h4>Target Report : </h4>
                
                <div className="report-details">
                    <span>{targetReport?.fullname} {targetReport?.email} {targetReport?.content}</span>
                    <br />  
                    <span>{targetReport?.type == 'Product' ? <div>Reported Product : <Link to={`/product/${targetReport?.product_id}`}>{targetReport?.title}</Link></div> : <></>}</span>
                </div>

            </div>
            <div className="delete-report-bottom">
                <h4>Reason of report deletion</h4>
                <div className="select">
                    <span onClick={() => setSelectReason("Valid Report – Content Removed")}>Valid Report – Content Removed</span>
                    <span onClick={() => setSelectReason("Valid Report – Warning Sent")}>Valid Report – Warning Sent</span>
                    <span onClick={() => setSelectReason("Valid Report – Listing Edited")}>Valid Report – Listing Edited</span>
                    <span onClick={() => setSelectReason("Invalid Report – No Violation")}>Invalid Report – No Violation</span>
                    <span onClick={() => setSelectReason("Duplicate Report")}>Duplicate Report</span>
                    <span onClick={() => setSelectReason("Resolved – Already Fixed")}>Resolved – Already Fixed</span>
                    <span onClick={() => setSelectReason("Other Action Taken")}>Other Action Taken</span>
                </div>

            </div>
            <button className="btn btn-danger" onClick={() => handleDeleteReport()} ref={btnRef}>Delete</button>
            <button className="btn" onClick={() => setToggleDeleteReport({status : false , reeportDetails : null})}>Cancle</button>
        </div>
    )
}

export default DeleteReport