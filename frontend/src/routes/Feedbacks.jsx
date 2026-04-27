import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { BACKEND_URL } from "../../config";
import AdminHeader from "../admin/components/AdminHeader";
import AdminFeedback from "../admin/components/AdminFeedback";
import Footer from "../layout/Footer";
const Feedbacks = () => {

    const [ cookies ] = useCookies(['token'])

    const [feedbacks, setFeedbacks] = useState([])
    const [offsets , setOffsets] = useState({platform : 0 , product : 0});

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const fetchFeedbacks = async(status) => {
        try{
            const offset = offsets[status]
            const response = await axios.get(`${BACKEND_URL}/api/feedback/${offset}/${status}`, config)
            if (response.status === 204 || !response?.data.feedbacks.length) return;

            setFeedbacks(prev => [...prev, ...response.data.feedbacks]);
            setOffsets(prev => ({...prev,[status]: prev[status] + response.data.feedbacks.length}));

        }catch(err){
            setFeedbacks(prev);
            setOffsets(prev);
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

    const removeFeedback = async(id) =>{ //api functionm to delete user feedback as admin
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/feedback/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}}); //making api call
            if(response.status === 200) setFeedbacks(prev => prev.filter((fb => fb.feedback_id !== id))) //handling 200 status code

        }catch(err){
            setFeedbacks(prev); //returning previous state if err occurs
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

    useEffect(() => { fetchFeedbacks('product'); fetchFeedbacks('platform') },[offsets])

    return(
         <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            <div className="main-body" >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header"><AdminHeader /></div>

                    <section className="mt-2">
                        <h4 className="p-2"><i class="fa-solid fa-bag-shopping p-2 rounded-1 w-auto" style={{color : '#10b981', backgroundColor : "rgba(16, 185, 129, 0.2)"}}></i> Product Feedbacks</h4>
                        <div className="products">
                            {feedbacks.filter(feedback => feedback.type === 'product')?.length !== 0 ? feedbacks.filter(feedback => feedback.type === 'product')?.map((feedback) => (
                                    <AdminFeedback feedback={feedback} removeFeedback={removeFeedback}/>
                            )) : <></>}
                        </div>
                        {feedbacks.filter(feedback => feedback.type === 'product')?.length % 10 !== 0 || feedbacks.filter(feedback => feedback.type === 'product')?.length === 0 ? <></> : 
                        <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffsets((prev) => {if(feedbacks.filter(feedback => feedback.type === 'product')?.length % 10 === 0){return {platform : prev , product : prev + 15}} return prev})}>Load More Product Feedbacks...</button>}
                        
                    </section>

                    <section className="mt-5">
                        <h4 className="p-2"><i class="fa-solid fa-laptop-code p-2 rounded-1 w-auto" style={{color : '#10b981', backgroundColor : "rgba(16, 185, 129, 0.2)"}}></i> Platform Feedbacks</h4>
                        <div className="products">
                            {feedbacks.filter(feedback => feedback.type === 'platform')?.length !== 0 ? feedbacks?.filter(feedback => feedback.type === 'platform').map(feedback => <AdminFeedback feedback={feedback} removeFeedback={removeFeedback}/>) : <></>}
                        </div>
                        {feedbacks.filter(feedback => feedback.type === 'platform')?.length % 10 !== 0 || feedbacks.filter(feedback => feedback.type === 'platform')?.length === 0 ? <></> : 
                        <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffsets((prev) => {if(feedbacks.filter(feedback => feedback.type === 'platform')?.length % 10 === 0){return {platform : prev + 15 , product : prev}} return prev})}>Load More Platform Feedbacks...</button>}
                        
                    </section>
                    

                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Feedbacks;