import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react lbiraries

import { useState } from "react"; //importing useState hook from react
import { BACKEND_URL } from "../../../../config"; //importing backend url from config file

import AdminFeedback from "../AdminFeedback";
import EmptyFeedbacks from "../../../empty/EmptyFeedbacks"; //importing react components

const ManageFeedbacks = ({ setFeedbacks , feedbacks}) => {//importing props from parent component (AdminDashboard.jsx)

    const [ cookies ] = useCookies(['token'])
    const [toggleDrop , setToggleDrop] = useState(false);

    const removeFeedback = async(id) =>{
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/feedback/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200) setFeedbacks(prev => prev.filter((fb => fb.feedback_id !== id)))
            // toggle stattus 400 alert messagee
            setToggleDrop(false)



        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="manage-feedbacks-container mt-5">

            <div className="feedbacks-header-container d-flex gap-2 mb-2">
                <h4><i class="fa-solid fa-message me-2" style={{color : '#10b981'}}></i>Feedbacks</h4>
                <Link to={'/admin-dashboard/feedbacks'}><i class="p-2 w-auto fa-solid fa-arrow-up-right-from-square text-secondary"></i></Link>
            </div>

            
            {feedbacks?.length !== 0 ? <div className="manage-feedbacks-main">{feedbacks?.map(feedback => (
                <AdminFeedback feedback={feedback} removeFeedback={removeFeedback} toggleDrop={toggleDrop} setToggleDrop={setToggleDrop}/>
            ))}</div> : <EmptyFeedbacks />}
            
        </div>
    );
};

export default ManageFeedbacks;