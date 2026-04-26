import { useContext, useEffect, useState } from "react"

import { UserContext } from "../context/UserContext"
import { useCookies } from "react-cookie"
import Sidebar from "../layout/Sidebar"
import PlatformFeedback from "../components/feedback/PlatformFeedback"
import Feedback from "../components/feedback/Feedback"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import CustomerFeedbackSkeleton from "../skeletons/CustomerFeedbackSkeleton"
import EmptyCustomerFeedback from "../empty/EmptyCustomerFeedback"
import StatusMessage from "../alerts/StatusMessage"

const LeaveFeedback = () => {

    const { user } = useContext(UserContext);

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading ,setIsLoading] = useState(true);
    const [ cookies ] = useCookies(['token']); //defining user cookies
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

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
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
                setFeedbacks([])
            }
        }

        return () => fetchFeedbacks();
    },[])

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
                {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            <div className="main-body">
                <div className="main-start"><Sidebar /></div>

                <div className="main-end">
                    <div className="main-header"><Header /></div>

                    <div className="leave-feedback-container">
                        <h1 className="fw-bold">Share Your Experience</h1>
                        <h5>Help us improve your experience by sharing your thoughts.</h5>
                        <span className="small">Your feedback helps us identify issues, improve features, and deliver a better product for everyone.</span>

                        {user ? <PlatformFeedback setFeedbacks={setFeedbacks}/> : <></>}
                    </div>

                    
                        {isLoading ? <CustomerFeedbackSkeleton /> : feedbacks.length === 0 ? <EmptyCustomerFeedback /> : <div className="manage-feedbacks-main mt-3"> {feedbacks?.map(fb => 
                            <Feedback fb={fb} user={user} removeFeedback={removeFeedback}/>)}</div> }
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LeaveFeedback