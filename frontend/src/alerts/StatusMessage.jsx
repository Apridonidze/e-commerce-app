import { useEffect, useRef, useState } from "react";

import '../styles/layout.css'

const StatusMessage = ({ setToggleAlert, toggleAlert }) => {

    const statusRef = useRef(null);
    const [targetIcon, setTargetIcon] = useState()
    const [second, setSecond] = useState(3);
    const icons = [
        {type : "Success", statusCode : 200 , icon : <i className="fa-solid fa-check d-flex justify-content-center rounded-5 h-auto fs-6" style={{border : '3px solid #035b41', padding : '5px 13px' }}></i>},
        {type : "Info" , statusCode : 200, icon : <i class="fa-solid fa-exclamation fs-4"></i>},
        {type : "Warning" , statusCode : 200, icon : <i className='fa-solid fa-circle-exclamation fs-4'></i>},
        {type : "Failed" ,statusCode : 400 , icon : <i className="fa-solid fa-circle-exclamation fs-4" style={{ color : '#ba1a1a'}}></i>},
        {type : "Internal_Error" , statusCode : 500 , icon : <i className='fa-solid fa-circle-exclamation fs-4' style={{ color : '#ba1a1a'}}></i>},
    ]

    useEffect(() => {

        if(statusRef && statusRef.current){

            for(let i = 0 ; i < icons.length ; i ++){
                if (icons[i].type === toggleAlert.type) {
                    setTargetIcon(icons[i].icon);
                    statusRef.current.classList.add(icons[i].type)
                    break; 
                };
            };
        }

    },[statusRef, toggleAlert])

    useEffect(() => {
        if (second <= 0) return;

        const timer = setTimeout(() => {
           
            setSecond((prev) => {
                if (prev <= 1) {
                    setToggleAlert({status : false , type: '', statusCode : null, message : ''});
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [second]);

    
    return(
        <div className="status-message-container" ref={statusRef}>
            {targetIcon}
            <h6>{toggleAlert.message}</h6>
            {/* {toggleAlert} */}
            {second}
        </div>
    )
}

export default StatusMessage;