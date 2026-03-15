import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";

import { BACKEND_URL } from "../../config";

const Feedbacks = () => {

    const [ cookies ] = useCookies(['token'])

    const [feedbacks, setFeedbacks] = useState([])
    const [offsets , setOffsets] = useState(0);

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    const fetchFeedbacks = async(offset) => {
        
        try{

            const response = await axios.get(`${BACKEND_URL}/api/feedback/${offset}`, config)
            console.log(response)
            if(response.status === 204) setFeedbacks([])

            setOffsets(prev => prev + response.data.feedbacks.length);
            setFeedbacks(prev => [...prev, ...response.data.feedbacks])

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => { fetchFeedbacks(0) },[])

    console.log(offsets)

    return(
        <div className="feedbacks-container d-flex">
            <Sidebar />
            <div className="feedback-main-container">
                <div className="feedback-header">
                    Feedbacks
                    <Link to={'/admin-dashboard'}>Prev</Link>
                </div>
                <div className="feedback-main">

                    {feedbacks?.length % 5 !== 0 || feedbacks?.length === 0 ? <span>No More Feedbacks</span> : <button onClick={() => fetchFeedbacks(offsets)}>Load More...</button>}

                </div>
            </div>
        </div>
    )
}


export default Feedbacks;