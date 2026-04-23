import { Link } from "react-router-dom" ; //importing react library

const EmptyFeedbacks = () => {
    return(
        <div className="empty-feedbacks-container">
            <i class="fa-solid fa-comment-slash"></i>
            <h4>No feedback yet</h4>
            <h6>Customer feedback and reviews will show up here once users start sharing their experience.</h6>
            <Link to='/admin-dashboard/feedbacks'><i class="fa-solid fa-clock-rotate-left"></i>Go to feeback's history</Link>
        </div>
    );
};

export default EmptyFeedbacks; //exporting component