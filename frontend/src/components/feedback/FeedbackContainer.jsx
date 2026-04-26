import { useRef, useEffect } from "react"
import Feedback from "./Feedback";
import EmptyCustomerFeedback from "../../empty/EmptyCustomerFeedback";

const FeedbackContainer = ({ user, removeFeedback ,cookies , feedback, handlePostFeedback, feedbackData, setFeedbackData}) => {
   
    const postRef = useRef(null)

    const emptyStar = <i class="fa-regular fa-star"></i>;
    const star = <i class="fa-solid fa-star"></i>; //definign star icons to display calcualted rate ratio of user's feedback

    useEffect(() => {

        if(!postRef?.current) return

        !feedbackData?.star || !feedbackData?.content ? postRef.current.disabled = true : postRef.current.disabled = false 

    } ,[feedbackData])

    return(
        <div className="feedback py-2" >
            <div className="feedback-header mt-2">
                <h3 className="fw-bold" style={{color : '#10b981'}}>Product Reviews</h3>
            </div>

            <div className="feedback-main">
                {cookies.token && (
                    <div className="feedback-input-container mt-4" style={{position : 'relative' , left : '0vw'}} tabIndex={100}>
                        <div className="stars d d-flex gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                    key={value}
                                    style={{ cursor: "pointer", fontSize: "26px" }}
                                    onClick={() =>
                                        setFeedbackData({ ...feedbackData, star: value })
                                    }
                                    >
                                    {feedbackData.star >= value ? star : emptyStar}
                                    </span>
                                ))}
                            </div>
                        <div className="feedback-input mt-1 d-flex flex-column gap-2">
                            <textarea type="text " style={{resize: 'none' , height : '8rem'}} onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} value={feedbackData?.content || ""} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>

                            <button ref={postRef} onClick={() => handlePostFeedback()} className='submit fs-6 btn btn-0 border-0 text-white'><i class="fa-solid fa-paper-plane"></i>Post Your Feedback</button>
                        </div>
                    </div>
                )}
                

                <div className="feedback-footer d-flex flex-column mt-4">
                    {feedback.length > 0 ? ([...feedback].reverse().slice(0,3 ).map((fb) => <Feedback fb={fb} user={user} removeFeedback={removeFeedback}/> )) : <EmptyCustomerFeedback />}
                </div>
            </div>
        </div>
    )
}

export default FeedbackContainer