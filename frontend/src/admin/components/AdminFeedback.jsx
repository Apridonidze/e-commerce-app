import axios from "axios";

import { BACKEND_URL } from "../../config";

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";

const AdminFeedback = ({ feedback, feedbackId, key, setFeedbacks }) => {

    const [ cookies ] = useCookies(['token'])

    const [toggleDrop , setToggleDrop] = useState(false);

    const removeFeedback = async(id) =>{
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/feedback/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200) setFeedbacks(prev => prev.filter((fb => fb.feedback_id !== feedback.feedback_id)))
            // toggle stattus 400 alert messagee
            setToggleDrop(false)



        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="admin-feedback-container d-flex justify-content-between" key={feedbackId}>
            <div className="admin-start">
                <div className="admin-header">
                <h4>{feedback.fullname}</h4>
            </div>
            <div className="admin-footer">
                <h6>{feedback.content}</h6>
                {feedback.stars}
                {feedback.type}
                {feedback.type === "product" ? <>
                    Product : <Link to={`/product/${feedback.product_id}`}>{feedback.title}</Link>
                </> : <></>}
            </div>
            </div>
            <div className="admin-end">
                <button className="btn btn-primary" onClick={() => setToggleDrop(!toggleDrop)}>:</button>
                <div className="toggle text-white" style={{ display : toggleDrop ? 'flex' : 'none' , flexDirection : 'column',position : 'relative', top : '10px'}}>
                    <button className="btn btn-danger" onClick={() => removeFeedback(feedback.feedback_id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
// add toggledown with delete function in admin-end to trigger delete component
export default AdminFeedback