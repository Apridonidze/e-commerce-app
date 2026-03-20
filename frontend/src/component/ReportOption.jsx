const ReportOption = ({ reason, setTargetReason, targetReason }) => {
    return(
        <div className={`report-option-container ${targetReason === reason.id ? 'bg-primary text-white' : ''}`} key={reason.id} onClick={() => setTargetReason(reason.id)}>
            {reason.icon}
            {reason.title}
            {reason.desc}
        </div>
    )
}

export default ReportOption