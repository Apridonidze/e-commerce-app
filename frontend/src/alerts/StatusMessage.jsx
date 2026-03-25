import { useEffect } from "react";

const StatusMessage = ({ setToggleAlert }) => {

    useEffect(() => {

        setTimeout(() => {
            setToggleAlert(false);
        },3000);

    },[])

    return(
        <div className="status-message-container position-fixed top-0 border " tabIndex={99}>
            error
        </div>
    )
}

export default StatusMessage;