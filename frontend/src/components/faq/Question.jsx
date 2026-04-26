import Answer from "./Answer";

const Question = ({ faq }) => {
    return(
        <div className="question-container my-5">
            <div className="d-flex gap-2 align-items-end">{faq.icon}<h3 style={{fontWeight : 600}}>{faq.title}</h3></div>
            <div className="faq-items my-3">
                {faq.items.map((item , itemId) => 
                    <Answer item={item} itemId={itemId}/>
                )}
            </div>
        </div>
    );
};

export default Question; //exporting component