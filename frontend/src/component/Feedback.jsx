const Feedback = ({ feedback, feedbackId ,key }) => {
    return(
        <div className="feedback-container" key={feedbackId}>
            <span>{feedback.fullname} {feedback.starts} {feedback.content}</span>
        </div>
    )
}

////TODO : fix typeos
//TODO : craete loading skeleton for it


export default Feedback