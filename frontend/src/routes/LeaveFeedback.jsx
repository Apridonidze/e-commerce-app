import { useContext, useEffect, useState } from "react"

import { UserContext } from "../context/UserContext"

import Sidebar from "../layout/Sidebar"
import PlatformFeedback from "../component/PlatformFeedback"
import Feedback from "../component/Feedback"
import axios from "axios"
import { BACKEND_URL } from "../../config"
const LeaveFeedback = () => {

    const { user } = useContext(UserContext);

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {

        const fetchFeedbacks = async() => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/feedback/customer-feedbacks`)
                
                if(response.status === 204) setFeedbacks([])
                setFeedbacks(response.data.feedbacks)

            }catch(err){
                setFeedbacks([])
                console.log(err)
            }
        }

        return () => fetchFeedbacks();
    },[])

    return(
        <div className="leave-feedback-container d-flex">
            <Sidebar />
            <div className="leave-feedback-main-container">

                {user ? <PlatformFeedback setFeedbacks={setFeedbacks}/> : <></>}

                <div className="customers-feedbacks">
                    {feedbacks?.map((feedback, feedbackId) => (
                        <Feedback feedback={feedback} feedbackId={feedbackId} key={feedbackId}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeaveFeedback