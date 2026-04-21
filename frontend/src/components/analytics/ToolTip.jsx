const ToolTip = ({ active, payload, label }) => {

    if (!active || !payload) return;

    return(
        <div className="tooltip-container">
            <div>Revenue : {payload[0]?.value}</div>
            <div>Sales : {payload[1]?.value}</div>
        </div>
    )
}

export default ToolTip;