const ToolTip = ({ active, payload }) => { //reciving props from parent component (ChartDashboard.jsx)

    if (!active || !payload?.length) return null; //returning null if recieved props are invalid/undefined

    const revenue = payload.find(p => p.dataKey === "revenue")?.value;
    const sales = payload.find(p => p.dataKey === "sales")?.value; //defining revenue and sales value

    return(
        <div className="tooltip-container fs-6">
            <div ><i className="fa-solid fa-money-bill-trend-up"></i> Revenue : <b>${revenue.toFixed(2)}</b></div>
            <div><i className="fa-solid fa-cart-arrow-down"></i> Sales : <b>{sales}</b></div>
        </div>
    );
};

export default ToolTip; //exporting component