const AdminFeedback = ({ feedback, feedbackId, key }) => {
    return(
        <div className="admin-feedback-container" key={feedback}>
            <span>{feedback.fullname} {feedback.stars} {feedback.content}</span>
        </div>
    )
}

export default AdminFeedback