import { Link } from "react-router-dom"

const AdminFeedback = ({ feedback, feedbackId, key }) => {
    return(
        <div className="admin-feedback-container d-flex justify-content-between" key={feedback}>
            <div className="admin-start">
                <div className="admin-header">
                <h4>{feedback.fullname}</h4>
            </div>
            <div className="admin-footer">
                <h6>{feedback.content}</h6>
                {feedback.stars}
                {feedback.type}
                {feedback.type === "product" ? <>
                    Product : <Link to={`/product/${feedback.product_id}`}>{feedback.title}</Link>
                </> : <></>}
            </div>
            </div>
            <div className="admin-end">:</div>
        </div>
    )
}
// add toggledown with delete function in admin-end to trigger delete component
export default AdminFeedback