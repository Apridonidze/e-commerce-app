import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react lbiraries

import AdminFeedback from "../AdminFeedback";
import EmptyFeedbacks from "../../../empty/EmptyFeedbacks"; //importing react components

import { BACKEND_URL } from "../../../../config"; //importing backend url from config file

const ManageFeedbacks = ({ setToggleAlert, setFeedbacks , feedbacks}) => {//importing props from parent component (AdminDashboard.jsx)

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

    return(
        <div className="manage-feedbacks-container mt-5">

            <div className="feedbacks-header-container d-flex gap-2 mb-2">
                <h4><i class="fa-solid fa-message me-2" style={{color : '#10b981'}}></i>Feedbacks</h4>
                <Link to={'/admin-dashboard/feedbacks'}><i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
            </div>

            
            {feedbacks?.length !== 0 ? <div className="manage-feedbacks-main">{feedbacks?.map(feedback => (
                <AdminFeedback feedback={feedback} removeFeedback={removeFeedback} />
            ))}</div> : <EmptyFeedbacks />}
            
        </div>
    );
};

export default ManageFeedbacks; //exporting component