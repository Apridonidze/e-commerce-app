const Feedback = ({ feedback, feedbackId ,key }) => {
    return(
        <div className="feedback-container" key={feedbackId}>
            <span>{feedback.fullname} {feedback.starts} {feedback.content}</span>
        </div>
    )
}

export default Feedback