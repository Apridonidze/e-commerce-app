const Feedback = ({ feedback, feedbackId ,key }) => {
    return(
        <div className="feedback-container" key={feedbackId}>
            <span>{feedback.fullname} {feedback.stars} {feedback.content}</span>
        </div>
    )
}

export default Feedback