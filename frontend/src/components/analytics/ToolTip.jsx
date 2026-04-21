const ToolTip = ({ active, payload, label }) => {

    if (!active || !payload?.length) return null;

    const revenue = payload.find(p => p.dataKey === "revenue")?.value;
    const sales = payload.find(p => p.dataKey === "sales")?.value;

    return(
        <div className="tooltip-container p-2 fs-6">
            <div ><i className="fa-solid fa-money-bill-trend-up"></i> Revenue : {revenue}</div>
            <div><i className="fa-solid fa-cart-arrow-down"></i> Sales : {sales}</div>
        </div>
    )
}

export default ToolTip;