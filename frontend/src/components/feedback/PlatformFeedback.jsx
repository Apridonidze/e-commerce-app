import { useCookies } from "react-cookie"

import { UserContext } from "../../context/UserContext"
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

            // if(postFeedback.status === 200){return setFeedbacks(prev => [...prev, {fullname : user.fullname, stars : feedbackData.star , content : feedbackData.content }])}
           
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


    const emptyStar = <i class="fa-regular fa-star"></i>;
    const star = <i class="fa-solid fa-star"></i>; //definign star icons to display calcualted rate ratio of user's feedback

    useEffect(() => {

        if(!postRef?.current) return

        !feedbackData?.star || !feedbackData?.content ? postRef.current.disabled = true : postRef.current.disabled = false 

    } ,[feedbackData])

    return(
        <div className="feedback-input-container bg-white" style={{position : 'relative' , left : '0vw'}} tabIndex={100}>
                    <div className="stars d d-flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                key={value}
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() =>
                                    setFeedbackData({ ...feedbackData, star: value })
                                }
                                >
                                {feedbackData.star >= value ? star : emptyStar}
                                </span>
                            ))}
                        </div>
                    <div className="feedback-input d-flex w-100 gap-2">
                        <textarea type="text" style={{resize: 'none'}} onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} value={feedbackData?.content || ""} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>

                        <button ref={postRef} onClick={() => handlePostFeedback()} className='submit btn btn-0 border-0 text-white'><i class="fa-solid fa-paper-plane"></i> Post</button>
                    </div>
        </div>
    )
}

export default PlatformFeedback