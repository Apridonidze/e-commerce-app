import { useRef, useEffect } from "react"
import Feedback from "./Feedback";

const FeedbackContainer = ({ user, removeFeedback ,cookies , feedback, handlePostFeedback, feedbackData, setFeedbackData}) => {
   
    const postRef = useRef(null)

    const emptyStar = <i class="fa-regular fa-star"></i>;
    const star = <i class="fa-solid fa-star"></i>; //definign star icons to display calcualted rate ratio of user's feedback

    useEffect(() => {

        if(!postRef?.current) return

        !feedbackData?.star || !feedbackData?.content ? postRef.current.disabled = true : postRef.current.disabled = false 

    } ,[feedbackData])

    console.log(feedbackData)

    return(
        <div className="feedback py-2" >
            <div className="feedback-header">
                <h3>Product's Reviews</h3>
            </div>

            <div className="feedback-main">
                {cookies.token && (
                    <div className="my-4">
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
                        <input type="text" onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} value={feedbackData?.content || ""} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>

                        <button ref={postRef} onClick={() => handlePostFeedback()} className='submit btn btn-0 border-0 text-white'><i class="fa-solid fa-paper-plane"></i> Post</button>
                    </div>
                    </div>
                )}
                

                <div className="feedback-footer d-flex flex-column">
                    {feedback.length > 0 ? ([...feedback].reverse().slice(0,3 ).map((fb) => <Feedback fb={fb} user={user} removeFeedback={removeFeedback}/> )) : 'No review'}
                </div>
            </div>
        </div>
    )
}

export default FeedbackContainer