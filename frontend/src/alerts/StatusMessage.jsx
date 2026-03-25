import { useEffect } from "react";

const StatusMessage = ({ setToggleAlert, toggleAlert }) => {

    useEffect(() => {

        setTimeout(() => {
            setToggleAlert({status : false, responseStatus : false, message : null});
        },3000);

    },[])

    return(
        <div className="status-message-container position-fixed top-0 border " tabIndex={99}>
            {toggleAlert.message}
        </div>
    )
}

export default StatusMessage;