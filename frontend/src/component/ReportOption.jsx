const ReportOption = ({ reason, setTargetReason, targetReason, reasonRef }) => {
    return(
        <div className={`report-option-container ${targetReason === reason.id ? 'bg-primary text-white' : ''}`} ref={(el) => reasonRef.current[reason.id] = el} key={reason.id} onClick={() => setTargetReason(reason.id)}>
            {reason.icon}
            {reason.title}
            {reason.desc}
        </div>
    )
}

export default ReportOption