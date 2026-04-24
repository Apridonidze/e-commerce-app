import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BACKEND_URL } from '../../../config' ; //importing react lbiraries

import { useRef, useState, useEffect } from "react"; //importting react hooks

import ReportOption from "./ReportOption";
import OrderItem from '../order/OrderItem'; //importing react components

const ReportProduct = ({ setToggleReportProduct, toggleReportProduct, setToggleAlert }) => { //importing props from parent component (AdminDashboard.jsx || Main.jsx || Sales.jsx || ProductPage.jsx)

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
    ]; //array of reasons user should select while reporting product

    const [ cookies ] = useCookies(['token']); //defining user cookies

    const reasonRef = useRef([null]);
    const inputRef = useRef(null);
    const discardRef = useRef(null);
    const submitRef = useRef(null); //refs for inputs and buttons
    
    const [input, setInput] = useState('');
    const [targetReason ,setTargetReason] = useState(null); //state to store users inputs
    
    const [inputErr ,setInputErr] = useState(''); //error message state

     useEffect(() => {

        if(inputRef && inputRef.current && submitRef && submitRef.current){

            let isValid = false;

            if(input.length === 0 || input.length >= 20) { //checking editorial text message lengths and tirggering logic below if statement is true
                setInputErr(''); //clearing input message state
                
                inputRef.current.classList.remove('is-valid');
                inputRef.current.classList.remove('is-invalid'); //clearing input styling

                submitRef.current.disabled = false;  //toggling submitReef buton

                isValid = true ; //returning true statsu of isValid variable
            };

            if(input.length !== 0 && input.length < 20) { //checking editorial text message lengths and tirggering logic below if statement is true

                setInputErr('Please enter at least 20 characters'); //setting error message
                
                inputRef.current.classList.remove('is-valid');
                inputRef.current.classList.add('is-invalid'); //adding stylinging classNames to refs
            
                submitRef.current.disabled = true; //disabling submitRef button

                isValid = false; //returning false status of isValid variable
            };

            if(input.length > 500) { //checking editorial text message lengths and tirggering logic below if statement is true

                setInputErr('Please enter no more than 500 characters'); //setting error message
                
                inputRef.current.classList.remove('is-valid');
                inputRef.current.classList.add('is-invalid'); //adding stylinging to className's ref
            
                submitRef.current.disabled = true; //disabling submitref

                isValid = false ; //returning false status of isValid variable
            };

            if(!targetReason) submitRef.current.disabled = true ; isValid = false; //disabling submity button if targetReason is not choosed
            if(isValid) submitRef.current.disabled = false; //enabling submit button if every input is valid

        };

    },[input, inputRef, targetReason]); //logic executes on mount and on this dependencies changes

    useEffect(() => {

        document.body.style.overflow = 'hidden'; //hiding document body overflow when component is active
        return () => document.body.style.overflow = ''; //cleaniing up document body styling on component unmount

    },[]); //disabling body scrolling when component is triggered

    const handleSubmitReport = async() => {
        try{

            const response = await axios.post(`${BACKEND_URL}/api/report`, {type : targetReason.category , content : input, productId : toggleReportProduct.product_id , status : "Sent"} , {headers : {Authorization : `Bearer ${cookies.token}`}}); //making api request and sending user input/cookies
            
            setToggleAlert({status: true, type: "Success", statusCode: response.status, message: response.data.message}); //toggling usccess message      
            setToggleReportProduct({status : false , reportDetails : false}); //closing component 
            
        }catch(err){
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

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
    );
};

export default ReportProduct; //expopting component