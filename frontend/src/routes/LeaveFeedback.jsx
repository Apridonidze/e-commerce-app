import { useContext, useEffect, useState } from "react"

import { UserContext } from "../context/UserContext"
import FeedbacksSkeleton from '../skeletons/FeedbacksSkeleton'
import { useCookies } from "react-cookie"
import Sidebar from "../layout/Sidebar"
import PlatformFeedback from "../components/feedback/PlatformFeedback"
import Feedback from "../components/feedback/Feedback"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
const LeaveFeedback = () => {

    const { user } = useContext(UserContext);

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading ,setIsLoading] = useState(true);
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
                
                setIsLoading(false)
                setFeedbacks(response.data.feedbacks)

            }catch(err){
                setIsLoading(false)
                setFeedbacks([])
                console.log(err)
            }
        }

        return () => fetchFeedbacks();
    },[])

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
            <div className="main-body">
                <div className="main-start"><Sidebar /></div>

                <div className="main-end">
                    <div className="main-header"><Header /></div>

                    <h4>Share Your Experience</h4>
                    <h5>Help us improve your experience by sharing your thoughts.</h5>
                    <span className="small">Your feedback helps us identify issues, improve features, and deliver a better product for everyone.</span>

                    {user ? <PlatformFeedback setFeedbacks={setFeedbacks}/> : <></>}

                    
                        {!isLoading ? <FeedbacksSkeleton /> :<div className="manage-feedbacks-main"> {feedbacks?.map(fb => 
                            <Feedback fb={fb} removeFeedback={removeFeedback}/>)}</div>}
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LeaveFeedback