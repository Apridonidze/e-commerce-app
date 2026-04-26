const Question = ({ faq }) => {
    return(
        <div className="question-container">
            <h3>{faq.title}</h3>
            <div className="faq-items">
                {faq?.items.map((item , itemId) => (
                    <div className="faq-item" key={itemId}>
                        <div className="faq-header d-flex justify-content-between">
                            <h5>{item.question}</h5>
                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#collapseDiv${itemId}`} aria-expanded="false" aria-controls={`collapseDiv${itemId}`}>^</button>
                        </div>
                        <div className="collapse" id={`collapseDiv${itemId}`}>
                            <h5>{item.answer}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question; //exporting component