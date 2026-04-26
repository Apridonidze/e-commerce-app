const Answer = ({ item, itemId }) => {
    return(
        <div className="faq-item my-2" key={itemId}>
            <div className="faq-header d-flex justify-content-between">
                <h5><b>{item.question}</b></h5>
                <button className="btn" type="button" data-toggle="collapse" data-target={`#collapseDiv${itemId}`} aria-expanded="false" aria-controls={`collapseDiv${itemId}`}><i class="fa-solid fa-angle-down"></i></button>
            </div>
            <div className="collapse" id={`collapseDiv${itemId}`}>
                <h6 className="fw-light">{item.answer}</h6>
            </div>
        </div>
    );
};

export default Answer;