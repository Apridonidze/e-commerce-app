import axios from 'axios'
import { BACKEND_URL } from '../../../config' 

import ReportOption from "./ReportOption"
import { useRef, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import '../../styles/products.css'
import AdminItem from '../../admin/components/AdminItem';
import OrderItem from '../order/OrderItem';

const ReportProduct = ({ setToggleReportProduct, toggleReportProduct }) => {

    const reasons = [
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
    ]

    const [ cookies ] = useCookies(['token'])

    const reasonRef = useRef([null]);
    const inputRef = useRef(null);
    const discardRef = useRef(null);
    const submitRef = useRef(null);
    
    const [targetReason ,setTargetReason] = useState(null);
    const [input, setInput] = useState('');
    
    const [targetReasonErr, setTargerReasonErr] = useState('');
    const [inputErr ,setInputErr] = useState('');

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

        useEffect(() => {

        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = ''

    },[]); //disabling body scrolling when component is triggered

    const handleSubmitReport = async() => {
        try{

            const response = await axios.post(`${BACKEND_URL}/api/report`, {type : targetReason.category , content : input, productId : toggleReportProduct.product_id , status : "Sent"} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(response)
            if(response.status === 200) {
                
            }
        }catch(err){
            console.log(err)
            // toggle error emssage
        }
    }


    return(
        <div className="report-product-container overflow-hidden p-3" >
            <div className="report-header d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <h2>Report Product</h2>
                    <button className='btn border-0' onClick={() => setToggleReportProduct({status : false , reportDetails : null})}><i class="fa-solid fa-xmark"></i></button>
                </div>
                <h6>Submit detailed reports to help us resolve issues faster and keep the Shoptic ecosystem running smoothly.</h6>
            </div>

            <div className="report-target-product my-2 rounded-3">
                <OrderItem prod={toggleReportProduct.reportDetails}/>
            </div>

            <div className="report-input-container">
                    
                <div className="d-flex flex-column">
                    
                    <h5>Primary Reason</h5>

                    <div className="reasons-grid">
                        {reasons?.map(reason => (
                            <ReportOption reason={reason} setTargetReason={setTargetReason} targetReason={targetReason} reasonRef={reasonRef}/>
                        ))}
                    </div>

                    <span className="small text-danger">{targetReasonErr}</span>
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
                    <button className="btn border" ref={discardRef} onClick={() => setToggleReportProduct({status : false, reportDetails : null})}>Discard</button>
                    <button className="btn btn-danger" ref={submitRef} onClick={() => handleSubmitReport()}>Submit Report</button>
                </div>
            </div>
        </div>
    )
}

export default ReportProduct