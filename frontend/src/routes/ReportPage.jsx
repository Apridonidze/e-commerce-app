import Sidebar from "../layout/Sidebar"
import ReportOption from "../component/ReportOption"
import { useEffect, useState } from "react"
import { useRef } from "react"

const ReportPage = () => {

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
            id: 5,
            category: 'Product',
            icon: <i className="fa-solid fa-circle-exclamation"></i>,
            title: 'Inappropriate Content',
            desc: 'Offensive material or behavior violating community guidelines'
        },
        {
            id: 6,
            category: 'Product',
            icon: <i className="fa-solid fa-tags"></i>,
            title: 'Misleading Description',
            desc: 'Product details do not match actual item received'
        },
        {
            id: 7,
            category: 'Product',
            icon: <i className="fa-solid fa-box-open"></i>,
            title: 'Damaged Product',
            desc: 'Item arrived broken or not in expected condition'
        },
        {
            id: 8,
            category: 'Product',
            icon: <i className="fa-solid fa-copyright"></i>,
            title: 'Counterfeit Item',
            desc: 'Fake or unauthorized replica being sold'
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


    const handleSubmitReport = async() => {}

    const handleDiscard = () => {

    }

    return(
        <div className="report-page-container d-flex">
            <Sidebar />
            <div className="report-main-container">
                <div className="report-header">
                    <h1>Report</h1>
                    <h4>Help us maintain the integrity of the Curator ecosystem. Detailed reports allow our developer's team to resolve disputes and technical erros with precision</h4>
                </div>
                <div className="report-input-container">
                    
                    <div className="row">
                        <h4>Select Primary Reason : </h4>
                        {reasons?.map(reason => (
                            <ReportOption reason={reason} setTargetReason={setTargetReason} targetReason={targetReason} reasonRef={reasonRef}/>
                        ))}
                        <span className="text-danger">{targetReasonErr}</span>
                    </div>

                    <div className="row">
                        <h4>Editorial Context</h4>
                        <div className="form-floating">
                            <textarea className="form-control" onChange={(e) => setInput(e.target.value)} ref={inputRef} name="textArea" id="textArea" placeholder="Provide detailed information regarding the artifact or behavior in question... Min(20 characters)" />
                            <label  htmlFor="textArea">Provide detailed information regarding the artifact or behavior in question... Min(20 characters)</label>
                            <span className="text-danger">{inputErr}</span>
                        </div>
                    </div>
                        
                </div>
                <div className="report-footer row">
                    <div className="report-start ">
                        <h6>Reports are processed within 24 hours by our human curators.</h6>
                    </div> 
                    <div className="report-end ">
                        <button className="btn border" ref={discardRef}>Discard</button>
                        <button className="btn btn-danger" ref={submitRef}>Submit Report</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPage