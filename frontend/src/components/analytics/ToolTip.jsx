const ToolTip = ({ active, payload, label }) => {
        return(
            <div>
                <div>Revenue : {payload[0]?.value}</div>
            </div>
        )
    }

export default ToolTip;