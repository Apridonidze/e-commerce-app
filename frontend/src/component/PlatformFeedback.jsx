import { useCookies } from "react-cookie"

import { UserContext } from "../context/UserContext"
import { useEffect, useState, useRef, useContext } from "react"

const PlatformFeedback = ({ setFeedbacks }) => {

    const { user } = useContext(UserContext)
    const [cookies] = useCookies(['token'])

    const [feedbackData, setFeedbackData] = useState({})

    const postRef = useRef(null)

    const handleFeedback = async() => {

        !feedbackData.star || !feedbackData.content ? postRef.current.disabled = true : postRef.current.disabled = false;
        //add erorr message if we do not have feedback.star and feedback.content

        try{

            const postFeedback = await axios.post(`${BACKEND_URL}/api/feedback/` , feedbackData , {headers : {Authorization : `Bearer ${cookies.token}`}})

            if(postFeedback.status === 200){return setFeedbacks(prev => [...prev, {fullname : user.fullname, stars : feedbackData.star , content : feedbackData.content }])}
           
            //if status === 400 toggle error message

        }catch(err){
            //toggle eerror message
            console.log(err)
        }
    }

    useEffect(() => {

        if(!postRef?.current) return

        !feedbackData.star || !feedbackData.content ? postRef.current.disabled = true : postRef.current.disabled = false 

    } ,[feedbackData])

    return(
        <div className="feedback-input-container bg-white" style={{position : 'relative' , left : '0vw'}} tabIndex={100}>
            <input type="text" onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>

           <div className="d d-flex">
                <span onClick={() => setFeedbackData({...feedbackData, star : 1})}>*</span>
                <span onClick={() => setFeedbackData({...feedbackData, star : 2})}>*</span>
                <span onClick={() => setFeedbackData({...feedbackData, star : 3})}>*</span>
                <span onClick={() => setFeedbackData({...feedbackData, star : 4})}>*</span>
                <span onClick={() => setFeedbackData({...feedbackData, star : 5})}>*</span>
           </div>

            <button ref={postRef} onClick={() => handleFeedback()} className='btn btn-primary'>Post</button>
        </div>
    )
}

export default PlatformFeedback