import ChartDashboard from "./ChartDashobard";

const Charts = ({ setChartsDate , chartsDate, chartsData }) => {

    return(
        <div className="charts-container">

            <div className="charts-header">
                <div className="charts-header-start">
                    <h4>Performance Analytics</h4>
                </div>
                <div className="charts-header-end">
                    <button className={`chartsDate ${chartsDate == 'Week' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== 'Week' ? "Week" : prev)}>7 Days</button>
                    <button className={`chartsDate ${chartsDate == 'Month' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== "Month" ? "Month" : prev)}>30 Days</button>
                </div>
            </div>

            <div className="charts-main">
                <ChartDashboard chartsData={chartsData}/>
            </div>

        </div>
    );
};

export default Charts;