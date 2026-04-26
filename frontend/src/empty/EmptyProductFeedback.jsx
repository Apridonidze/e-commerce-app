const EmptyProductFeedback = () => {
    return(
        <div className="empty-product-feedbacks-container">
            <i class="fa-solid fa-comment-slash rounded-3"></i>
            <h4>Be the first to review this product</h4>
            <h6 className="small">There are no reviews yet. Share your thoughts and help others understand if this product is right for them.</h6>
        </div>
    );
};

export default EmptyProductFeedback; //exporting component