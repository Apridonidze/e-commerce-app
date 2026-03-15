import { Link } from "react-router-dom"

const AdminFeedback = ({ feedback, feedbackId, key }) => {
    return(
        <div className="admin-feedback-container" key={feedback}>
            <div className="admin-header">
                <h4>{feedback.fullname}</h4>
            </div>
            <div className="admin-footer">
                <h6>{feedback.content}</h6>
                {feedback.stars}
                {feedback.type}
                {feedback.type === "Product" ? <>
                    Product : <Link to={`product/${feedback.product_id}`}>{feedback.title}</Link>
                </> : <></>}
            </div>
        </div>
    )
}

export default AdminFeedback