import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import AdminFeedback from "../admin/components/AdminFeedback";

import { BACKEND_URL } from "../../config";

const Feedbacks = () => {

    const [ cookies ] = useCookies(['token'])

    const [feedbacks, setFeedbacks] = useState([])
    const [offsets , setOffsets] = useState({platform : 0 , product : 0});

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    const fetchFeedbacks = async(status) => {
        try{
            const offset = offsets[status]
            const response = await axios.get(`${BACKEND_URL}/api/feedback/${offset}/${status}`, config)
            console.log(response)
            if (response.status === 204 || !response?.data.feedbacks.length) return;

            setFeedbacks(prev => [...prev, ...response.data.feedbacks]);
            setOffsets(prev => ({...prev,[status]: prev[status] + response.data.feedbacks.length}));

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { fetchFeedbacks('product'); fetchFeedbacks('platform') },[])

    return(
        <div className="feedbacks-container d-flex">
            <Sidebar />
            <div className="feedback-main-container">
                <div className="feedback-header">
                    Feedbacks
                    <Link to={'/admin-dashboard'}>Prev</Link>
                </div>
                <div className="feedback-main">

                    <h1>Product</h1>
                    {feedbacks.filter(feedback => feedback.type === 'product')?.length !== 0 ? feedbacks.filter(feedback => feedback.type === 'product')?.map((feedback, feedbackId) => (
                                <AdminFeedback feedback={feedback} feedbackId={feedbackId} key={feedbackId}/>
                        )) : <></>}
                    {feedbacks.filter(feedback => feedback.type === 'product')?.length % 10 !== 0 || feedbacks.filter(feedback => feedback.type === 'product')?.length === 0 ? <span>No More Product Feedbacks</span> : <button onClick={() => fetchFeedbacks('product')}>Load More...</button>}
                    
                    <h1>Platform</h1>
                    {feedbacks.filter(feedback => feedback.type === 'platform')?.length !== 0 ? feedbacks?.filter(feedback => feedback.type === 'platform').map((feedback, feedbackId) => (
                                <AdminFeedback feedback={feedback} feedbackId={feedbackId} key={feedbackId}/>
                            )) : <></>}
                    {feedbacks.filter(feedback => feedback.type === 'platform')?.length % 10 !== 0 || feedbacks.filter(feedback => feedback.type === 'platform')?.length === 0 ? <span>No More Platform Feedbacks</span> : <button onClick={() => fetchFeedbacks('platform')}>Load More...</button>}


                </div>
            </div>
        </div>
    )
}


export default Feedbacks;