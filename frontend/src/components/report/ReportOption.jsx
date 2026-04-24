const ReportOption = ({ reason, setTargetReason, targetReason, reasonRef }) => { //importing params from parent component (ReportProduct.jsx)
    return(
        <div className={`report-option-container p-2 rounded-3 ${targetReason?.id === reason.id ? 'active' : ''}`} style={{cursor : 'pointer'}} ref={(el) => reasonRef.current[reason.id] = el} key={reason.id} onClick={() => setTargetReason(reason)}>
            <div className="report-option-start d-flex gap-2">
                {reason.icon}
                <b>{reason.title}</b>
            </div>
            <div className="report-option-end"><span>{reason.desc}</span></div>
        </div>
    );
};

export default ReportOption; //importing componnet