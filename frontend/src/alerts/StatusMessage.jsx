import '../styles/alerts.css'; //importing css file
import { useEffect, useRef, useState } from "react"; //importing react hooks

const StatusMessage = ({ setToggleAlert, toggleAlert }) => {

    const statusRef = useRef(null); //ref for component to style it based on status code recieved from parent component

    const [second, setSecond] = useState(3); //countdown till component unmounts
    const [targetIcon, setTargetIcon] = useState(); //state to store icon of status message given

    const icons = [
        {type : "Success", statusCode : 200 , icon : <i class="fa-solid fa-circle-check fs-4"></i>},
        {type : "Info" , statusCode : 200, icon : <i class="fa-solid fa-exclamation fs-4"></i>},
        {type : "Warning" , statusCode : 200, icon : <i className='fa-solid fa-circle-exclamation fs-4'></i>},
        {type : "Failed" ,statusCode : 400 , icon : <i className="fa-solid fa-circle-exclamation fs-4" ></i>},
        {type : "Internal_Error" , statusCode : 500 , icon : <i className='fa-solid fa-circle-exclamation fs-4'></i>},
    ]; //default status messages

    useEffect(() => {

        if(!statusRef && !statusRef.current) return; //returning empty promise if statusRef is undefined or null\

        for(let i = 0 ; i < icons.length ; i ++){ //looping status message array

            if (icons[i].type === toggleAlert.type) { //checking what status code is given at the index
                    
                setTargetIcon(icons[i].icon); //setting icon in state
                statusRef.current.classList.add(icons[i].type); //adding status stypes as classlist to statusRef container
                break;  //stopping function after we succesfully find correct icon.
                
            };
        };

    },[statusRef, toggleAlert]); //tirggers once a statusRef and toggleAlert dependencies change

    useEffect(() => {

        if (second <= 0) return; //returning empty promise if seconds are less or equal to 0

        const timer = setTimeout(() => { //defining timer to make count down
           
            setSecond((prev) => {

                if (prev <= 1) {//checking if seconds previous number is one
                    setToggleAlert({status : false , type: '', statusCode : null, message : ''}); //untoggling component
                    return 0; //setting state to zero
                };
                return prev - 1; //executing prev -1 logic if seconds are not less than 1

            });

        }, 1000); //executing function in every 1 second 

        return () => clearTimeout(timer); //cleanup function

    }, [second]); //triggering function on seconds change
    
    return(
        <div className="status-message-container w-auto" ref={statusRef}>
            
            <div className="status-message d-flex align-items-center justify-content-start gap-3 h-auto ">
                <span className='d-flex align-items-center h-auto'>{targetIcon}</span>
                <h6 className='my-auto'>{toggleAlert.message}</h6>
            </div>
            
            <div className="progress-bar">
                <div className="progress-fill" style={{ animationDuration: "3s" }} />
            </div>

        </div>
    );
};

export default StatusMessage; //exporting component