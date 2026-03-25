import { useEffect } from "react";

import '../styles/layout.css'

const StatusMessage = ({ setToggleAlert, toggleAlert }) => {

    // useEffect(() => {

    //     setTimeout(() => {
    //         setToggleAlert({status : false, responseStatus : false, message : null});
    //     },3000);

    // },[])

    return(
        <div className="status-message-container">
            {toggleAlert.message}
            testestasdasd
        </div>
    )
}

export default StatusMessage;