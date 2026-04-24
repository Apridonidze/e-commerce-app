const FeedbackContainer = ({ cookies , feedback}) => {

    // {toggleFeedback && <div> <div className="feedback-bg bg-dark opacity-25 w-100 h-100" onClick={() => setToggleFeedback(false)} style={{ position: 'absolute', left: 0, top: 0 }}/><FeedbackInput /></div>
                    // }
    return(
        <div className="feedback " style={{width : '100%' , maxWidth : "400px"}}>
            <div className="feedback-header">
                <h3>{feedback.length} Product Review</h3>
            </div>

            <div className="feedback-main">
                {cookies.token && (
                    <div className="feedback-input d-flex">
                        <div className="form-floating">
                            <input type="text" onClick={() => setToggleFeedback(true)} className='form-control' id='fb-input'placeholder='Leave Your Feedback...'/>
                            <label htmlFor="fb-input">Leave Your Feedback...</label>
                        </div>

                        <button onClick={() => setToggleFeedback(true)} className='btn btn-primary'>Post</button>
                    </div>
                )}

                <div className="feedback-footer d-flex flex-column">
                    {feedback.length > 0 ? (feedback.map((fb, i) => (<span key={i}>{fb.fullname} {fb.content} {fb.stars}</span>))) : 'No review'}
                </div>
            </div>
        </div>
    )
}

export default FeedbackContainer