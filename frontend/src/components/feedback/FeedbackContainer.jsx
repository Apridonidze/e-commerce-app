const FeedbackContainer = ({ cookies , feedback}) => {

    // {toggleFeedback && <div> <div className="feedback-bg bg-dark opacity-25 w-100 h-100" onClick={() => setToggleFeedback(false)} style={{ position: 'absolute', left: 0, top: 0 }}/><FeedbackInput /></div>
                    // }

    //                 // 
    // const [cookies] = useCookies(['token'])
    // const [feedbackData, setFeedbackData] = useState({})

    // const { id } = useParams()

    // const postRef = useRef(null)

    // const handleFeedback = async() => {

    //     !feedbackData.star || !feedbackData.content ? postRef.current.disabled = true : postRef.current.disabled = false;
    //     //add erorr message if we do not have feedback.star and feedback.content

    //     try{

    //         const postFeedback = await axios.post(`${BACKEND_URL}/api/feedback/product-feedback/${id}` , feedbackData , {headers : {Authorization : `Bearer ${cookies.token}`}})

    //         console.log(postFeedback)
    //         //toggle success message

    //     }catch(err){
    //         //toggle eerror message
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {

    //     if(!postRef?.current) return

    //     !feedbackData.star || !feedbackData.content ? postRef.current.disabled = true : postRef.current.disabled = false 

    // } ,[feedbackData])

    // return(
    //     <div className="feedback-input-container bg-white" style={{position : 'relative' , left : '0vw'}} tabIndex={100}>
    //         <input type="text" onChange={(e) => setFeedbackData({...feedbackData, content : e.target.value})} className='form-control' id='fb-input' placeholder='Leave Your Feedback...'/>

    //        <div className="d d-flex">
    //             <span onClick={() => setFeedbackData({...feedbackData, star : 1})}>*</span>
    //             <span onClick={() => setFeedbackData({...feedbackData, star : 2})}>*</span>
    //             <span onClick={() => setFeedbackData({...feedbackData, star : 3})}>*</span>
    //             <span onClick={() => setFeedbackData({...feedbackData, star : 4})}>*</span>
    //             <span onClick={() => setFeedbackData({...feedbackData, star : 5})}>*</span>
    //        </div>

    //         <button ref={postRef} onClick={() => handleFeedback()} className='btn btn-primary'>Post</button>
    //     </div>
    // )
    return(
        <div className="feedback py-2" >
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