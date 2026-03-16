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

                const response = await axios.get(`${BACKEND_URL}/api/feedback/customers-feedbacks`)
                

            }catch(err){
                console.log(err)
            }
        }

        return () => fetchFeedbacks();

    },[])

    return(
        <div className="leave-feedback-container d-flex">
            <Sidebar />
            <div className="leave-feedback-main-container">

                {user ? <PlatformFeedback/> : <></>}

                <div className="customers-feedbacks">

                </div>
            </div>
        </div>
    )
}

export default LeaveFeedback