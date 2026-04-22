import { Link } from "react-router-dom";
import AdminFeedback from "../AdminFeedback";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";
import { useState } from "react";
const ManageFeedbacks = ({ setFeedbacks , feedbacks}) => {

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

            <div className="manage-feedbacks-main">
                {feedbacks?.length !== 0 ? feedbacks?.map(feedback => (
                    <AdminFeedback feedback={feedback} removeFeedback={removeFeedback} toggleDrop={toggleDrop} setToggleDrop={setToggleDrop}/>
                )) : "Empty feedback sttaets"}
            </div>
        </div>
    );
};

export default ManageFeedbacks;