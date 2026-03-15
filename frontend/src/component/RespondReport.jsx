import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useRef, useState, useEffect } from "react"

const RespondReport = ({ setToggleRespondReport, toggleRespondReport }) => {

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

            const response = await axios.post(`${BACKEND_URL}/api/report/${toggleRespondReport.reportDetails.id}`, {selectReason, status : "Responded"} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            console.log(response)
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
                    {selects.map((select,selectId) => (
                        <span key={selectId} onClick={() => setSelectReason(select.code)}>{select.title}</span>
                    ))}
                </div>

            </div>
            <button className="btn btn-primary" onClick={() => handleRespondReport()} ref={btnRef}>Respond</button>
            <button className="btn" onClick={() => setToggleRespondReport({status : false , reeportDetails : null})}>Cancle</button>
        </div>
    )
}

export default RespondReport;