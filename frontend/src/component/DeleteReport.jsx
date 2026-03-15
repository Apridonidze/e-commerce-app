import { useEffect, useRef, useState } from "react"

const DeleteReport = () => {

    const [selectReasone, setSelectReasone] = useState()
    const [message , setMessage] = useState() 

    const btnRef = useRef(null);

    useEffect(() => {
        // toggle btnref disable/anable statsus based on if inputs are valid
    },[selectReasone, message])

    const handleDeleteReport = async() => {
        // check if inuts are valid and then execute api call
    }

    return(
        <div className="delete-report-container position-fixed bg-white w-50 h-50" style={{zIndex : 999}}>
            <div className="delete-report-top">
                <h1>Delete Users Report</h1>
                <h4>Target Report : </h4>
            </div>
            <div className="delete-report-bottom">
                <h4>Reason of report deletion</h4>
                {/* add delete reasons */}
                {/* detailed message (optimonal) */}
            </div>
            <button className="btn btn-danger" onClick={() => handleDeleteReport()} ref={btnRef}>Delete</button>
            <button className="btn">Cancle</button>
        </div>
    )
}

export default DeleteReport