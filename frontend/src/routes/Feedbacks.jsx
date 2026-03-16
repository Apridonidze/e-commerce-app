import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import AdminFeedback from "../component/AdminFeedback";

import { BACKEND_URL } from "../../config";

const Feedbacks = () => {

    const [ cookies ] = useCookies(['token'])

    const [feedbacks, setFeedbacks] = useState([])
    const [offsets , setOffsets] = useState(0);

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    const fetchFeedbacks = async(offset) => {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/feedback/${offset}`, config)
            
            if (response.status === 204 || !response?.data.feedbacks.length) return;

            setFeedbacks(prev => [...prev, ...response.data.feedbacks]);
            setOffsets(prev => prev + response.data.feedbacks.length);

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { return () => fetchFeedbacks(offsets) },[])

    return(
        <div className="feedbacks-container d-flex">
            <Sidebar />
            <div className="feedback-main-container">
                <div className="feedback-header">
                    Feedbacks
                    <Link to={'/admin-dashboard'}>Prev</Link>
                </div>
                <div className="feedback-main">
                    {feedbacks?.length !== 0 ? feedbacks?.map((feedback, feedbackId) => (
                                <AdminFeedback feedback={feedback} feedbackId={feedbackId} key={feedbackId}/>
                            )) : "No Feedbacks"}
                    {feedbacks?.length % 10 !== 0 || feedbacks?.length === 0 ? <span>No More Feedbacks</span> : <button onClick={() => fetchFeedbacks(offsets)}>Load More...</button>}
                            
                </div>
            </div>
        </div>
    )
}


export default Feedbacks;