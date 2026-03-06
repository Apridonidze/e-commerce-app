import { useState } from "react"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"

import axios from "axios"
import { BACKEND_URL } from "../../config"


const FeedbackInput = () => {

    const [cookies] = useCookies(['token'])
    const [feedbackData, setFeedbackData] = useState({})

    const { id } = useParams()


    const handleFeedback = async() => {
        try{

            //check feedbackData to have content and stars, if not return disabled button else trigger api call

            const postFeedback = await axios.post(`${BACKEND_URL}/api/feedback/product-feedback/${id}` , feedbackData , {headers : {Authorization : `Bearer ${cookies.token}`}})

        }catch(err){

            console.log(err)
        }
    }

    return(
        <div className="feedback-input-container bg-white" style={{position : 'relative' , left : '0vw'}} tabIndex={100}>
            <input type="text" onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>
            <button onClick={() => handleFeedback()} className='btn btn-primary'>Post</button>
        </div>
    )
}

export default FeedbackInput