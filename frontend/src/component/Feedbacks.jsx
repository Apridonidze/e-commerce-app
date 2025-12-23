import Skeleton from "react-loading-skeleton"
import Feedback from "./Feedback"

const Feedbacks = ({ feedback }) => {
    return(
        <div className="feedback-container">
            <h1>Feedbacks</h1>
            {feedback?.map((feedback, feedbackId) => <Feedback feedback={feedback} feedbackId={feedbackId} key={feedbackId}/>) || <Skeleton count={3}/>}
        </div>
    )
}

export default Feedbacks