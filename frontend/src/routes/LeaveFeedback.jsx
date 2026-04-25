import { useContext, useEffect, useState } from "react"

import { UserContext } from "../context/UserContext"

import { useCookies } from "react-cookie"
import Sidebar from "../layout/Sidebar"
import PlatformFeedback from "../components/feedback/PlatformFeedback"
import Feedback from "../components/feedback/Feedback"
import axios from "axios"
import { BACKEND_URL } from "../../config"
const LeaveFeedback = () => {

    const { user } = useContext(UserContext);

    const [feedbacks, setFeedbacks] = useState([]);

        const [ cookies ] = useCookies(['token']); //defining user cookies

    const removeFeedback = async(id) =>{ //api functionm to delete user feedback as admin
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/feedback/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}}); //making api call
            if(response.status === 200) setFeedbacks(prev => prev.filter((fb => fb.feedback_id !== id))) //handling 200 status code

        }catch(err){
            setFeedbacks(prev); //returning previous state if err occurs
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
        };
    };

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
                    {feedbacks?.map(fb => (
                        <Feedback fb={fb} removeFeedback={removeFeedback}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeaveFeedback