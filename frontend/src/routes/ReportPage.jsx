import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Sidebar from "../layout/Sidebar"
import ReportOption from "../components/report/ReportOption"

import { useEffect, useState, useRef } from "react"

import axios from "axios"
import { useCookies } from "react-cookie"

import { BACKEND_URL } from "../../config"

const ReportPage = () => {

    const [ cookies ] = useCookies(['token'])

    const reasonRef = useRef([null]);
    const inputRef = useRef(null);
    const discardRef = useRef(null);
    const submitRef = useRef(null);

    const [targetReason ,setTargetReason] = useState(null);
    const [input, setInput] = useState('');

    const [targetReasonErr, setTargerReasonErr] = useState('');
    const [inputErr ,setInputErr] = useState('');

    const reasons =  [
        {
            id: 1,
            category: 'Platform',
            icon: <i className="fa-solid fa-bug"></i>,
            title: 'Platform Bug',
            desc: 'Unexpected errors, crashes, or broken functionality on the platform'
        },
        {
            id: 2,
            category: 'Platform',
            icon: <i className="fa-solid fa-shield-halved"></i>,
            title: 'Security Issue',
            desc: 'Potential vulnerability, data leak, or suspicious activity'
        },
        {
            id: 3,
            category: 'Service',
            icon: <i className="fa-solid fa-headset"></i>,
            title: 'Poor Customer Support',
            desc: 'Unhelpful or delayed responses from support team'
        },
        {
            id: 4,
            category: 'Service',
            icon: <i className="fa-solid fa-user-slash"></i>,
            title: 'Unprofessional Behavior',
            desc: 'Rude or inappropriate interaction from service representatives'
        },
        {
            id: 9,
            category: 'Delivery',
            icon: <i className="fa-solid fa-truck"></i>,
            title: 'Late Delivery',
            desc: 'Order arrived later than the estimated delivery date'
        },
        {
            id: 10,
            category: 'Delivery',
            icon: <i className="fa-solid fa-location-dot"></i>,
            title: 'Wrong Delivery',
            desc: 'Order delivered to incorrect address or wrong item received'
        },
        {
            id: 11,
            category: 'Delivery',
            icon: <i className="fa-solid fa-box"></i>,
            title: 'Lost Package',
            desc: 'Order marked as shipped but never arrived'
        },

        {
            id: 12,
            category: 'Other',
            icon: <i className="fa-solid fa-comment-dots"></i>,
            title: 'Spam or Abuse',
            desc: 'Unwanted messages, spam, or abusive behavior'
        },
        {
            id: 13,
            category: 'Other',
            icon: <i className="fa-solid fa-question"></i>,
            title: 'Other Issue',
            desc: 'Any issue not covered by the listed categories'
        }
    ];

    useEffect(() => {

        if(inputRef && inputRef.current && submitRef && submitRef.current){

            let isValid = false;

            if(input.length === 0 || input.length >= 20) {
                
                setInputErr('') 
                
                inputRef.current.classList.remove('is-valid')
                inputRef.current.classList.remove('is-invalid')

                submitRef.current.disabled = false; 

                isValid = true
            };

            if(input.length !== 0 && input.length < 20) {

                setInputErr('Please enter at least 20 characters')
                
                inputRef.current.classList.remove('is-valid')
                inputRef.current.classList.add('is-invalid')
            
                submitRef.current.disabled = true;

                isValid = false
            };

            if(input.length > 500) {

                setInputErr('Please enter no more than 500 characters')
                
                inputRef.current.classList.remove('is-valid')
                inputRef.current.classList.add('is-invalid')
            
                submitRef.current.disabled = true;

                isValid = false
            };

            if(!targetReason) submitRef.current.disabled = true ; isValid = false;

            if(isValid){submitRef.current.disabled = false}

        }

    },[input, inputRef, targetReason])

    const handleSubmitReport = async() => {
        try{

            const response = await axios.post(`${BACKEND_URL}/api/report/`, {type : targetReason.category , content : input , status : "Sent"} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(response)
            if(response.status === 200) {
                
            }
        }catch(err){
            console.log(err)
            // toggle error emssage
        }
    }

    const handleDiscard = () => {
        setTargetReason(null)
        setInput('')

        setTargerReasonErr('')
        setInputErr('')

        inputRef.current.classList.remove('is-valid');
        inputRef.current.classList.remove('is-invalid');

    }

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start" style={{maxWidth : '3000px'}}> 
              <div className="main-body" >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header">
                        <Header />
                    </div>

           


            <div className="report-container p-3 rounded-3" >
            <div className="report-header d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <h2>Report Product</h2>
                </div>
                <h6>Submit detailed reports to help us resolve issues faster and keep the Shoptic ecosystem running smoothly.</h6>
            </div>

            <div className="report-input-container">
                    
                <div className="d-flex flex-column">
                    
                    <h5>Primary Reason</h5>

                    <div className="reasons-grid">
                        {reasons?.map(reason => (
                            <ReportOption reason={reason} setTargetReason={setTargetReason} targetReason={targetReason} reasonRef={reasonRef}/>
                        ))}
                    </div>
                </div>

                <div className="row mt-3 mx-auto">
                    <h5 className='text-start p-0'>Editorial Context (Optional)</h5>
                    <textarea className="textArea form-control" onChange={(e) => setInput(e.target.value)} ref={inputRef} name="textArea" id="textArea" placeholder="Provide detailed information regarding the artifact or behavior in question... Min(20 characters)" />
                    <span className="text-danger mt-2 small">{inputErr}</span>
                </div>
                        
            </div>

            <div className="report-footer mt-2">
                <div className="report-start ">
                    <h6>Reports are processed within 24 hours by our human curators.</h6>
                </div> 
                <div className="manage-report-buttons">
                    <button className="btn border" ref={discardRef} onClick={() => handleDiscard()}>Discard</button>
                    <button className="btn btn-danger" ref={submitRef} onClick={() => handleSubmitReport()}>Submit Report</button>
                </div>
            </div>
        </div>
                  
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ReportPage