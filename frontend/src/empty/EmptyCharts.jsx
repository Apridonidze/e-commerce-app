import { useState } from "react";

const EmptyCharts = () => {

    const [chartsDate , setChartsDate] = useState("Month")

    return(
        <div className="empty-charts-container">
            <div className="charts-header">
                <div className="charts-header-start">
                    <h4><i class="fa-solid fa-chart-column"></i> Performance Analytics</h4>
                </div>
                <div className="charts-header-end">
                    <button className={`btn border-0 chartsDate ${chartsDate == 'Week' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== 'Week' ? "Week" : prev)}>7 Days</button>
                    <button className={`btn border-0 chartsDate ${chartsDate == 'Month' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== "Month" ? "Month" : prev)}>30 Days</button>
                </div>
            </div>

            <div className="empty-charts-main">
                <i class="fa-solid fa-chart-simple"></i>
                <h4 className="fw-bold">No sales data found.</h4>
                <h6 className="fw-light">Wait for the first product order to begin tracking performance and revenue growth.</h6>
            </div>
        </div>
    );
};

export default EmptyCharts; //exporting component