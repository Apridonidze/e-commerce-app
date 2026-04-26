const EmptyCustomerFeedback = () => {
    return(
        <div className="empty-feedbacks-container ">
            <i class="fa-solid fa-comment-slash rounded-3 fs-2"></i>
            <h4>No feedback yet</h4>
            <h6 className="small text-center">Customer feedback and reviews will show up here once users start sharing their experience.</h6>
        </div>
    );
};

export default EmptyCustomerFeedback; //exporting component