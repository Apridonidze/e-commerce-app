import Sidebar from "../layout/Sidebar"
import ReportOption from "../component/ReportOption"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"

const ReportPage = () => {

    const reasonRef = useRef([null]);
    const [targetReason ,setTargetReason] = useState(null);

    const reasons =  [
        {id : 0, icon : <i class="fa-solid fa-circle-exclamation"></i> , title : 'Inapproparate Content' , desc : 'Offsensive material or behaviour violating community guidelines'},
        {id : 1, icon : <i class="fa-regular fa-bell-slash"></i> , title : 'Incorrent Information' , desc : 'Factual errors in listins, pricing, or product specifications'},
        {id : 2, icon : <i class="fa-solid fa-bug"></i> , title : 'Technical Issue' , desc : 'Broken links, payment errors, or platform functionality bugs.'},
        {id : 3, icon : <i class="fa-solid fa-copyright"></i> , title : 'Copyright Violation' , desc : 'Intellectual property theft or unauthorized asset usage.'}
    ]


    return(
        <div className="report-page-container d-flex">
            <Sidebar />
            <div className="report-main-container">
                <div className="report-header">
                    <h1>Report</h1>
                    <h4>Help us maintain the integrity of the Curator ecosystem. Detailed reports allow our developer's team to resolve disputes and technical erros with precision</h4>
                </div>
                <div className="report-input-container">
                    <h4>Select Primary Reason : </h4>
                    {reasons?.map(reason => (
                        <ReportOption reason={reason} setTargetReason={setTargetReason} targetReason={targetReason} reasonRef={reasonRef}/>
                    ))}
                </div>
                <div className="report-footer">

                </div>
            </div>
        </div>
    )
}

export default ReportPage