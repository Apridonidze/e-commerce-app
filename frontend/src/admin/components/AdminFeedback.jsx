import { Link } from "react-router-dom"; //importing ract library

const AdminFeedback = ({ feedback, removeFeedback }) => {

    const emptyStar = <i class="fa-regular fa-star"></i>;
    const star = <i class="fa-solid fa-star"></i>; //definign star icons to display calcualted rate ratio of user's feedback

    return(
        <div className="admin-feedback-container rounded-3 p-2 mb-2 align-items-start d-flex flex-column justify-content-between" key={feedback.feedback_id}>

            <div className="admin-feedback-header d-flex justify-content-between w-100 pt-3">
                    <div className="initials">
                        <span className="userInitials text-uppercase me-2">{feedback.fullname.split(' ')[0].at(0)}{feedback.fullname.split(' ')[1].at(0)}</span>
                        <span className="fs-5 fw-bold">{feedback.fullname}</span>
                    </div>
                    
                    <div className="stars d-flex align-items-center gap-1">{[...Array(5)].map((_, i) => i < feedback.stars ? <span key={i}>{star}</span> : <span key={i}>{emptyStar}</span>)}</div>
             </div>

            <div className="admin-feedback-main py-3">
                <div className="comment text-break fs-6">{`"${feedback.content}"`}</div>
                    {feedback.type === "product" ? <span className="ms-1 fw-bold">
                        Product : <Link to={`/product/${feedback.product_id}`}>{feedback.title}</Link>
                    </span> : <></>}
            </div>

            <div className="admin-feedback-bottom w-100 py-2 d-flex align-items-center justify-content-between">
                <span style={{color : "#10b981"}} className="fw-bold ms-2">#{feedback.feedback_id}</span>
                <button className="deleteFeedbackBtn btn-none border-0 " onClick={() => removeFeedback(feedback.feedback_id)}><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    );
};

export default AdminFeedback; //exporting component