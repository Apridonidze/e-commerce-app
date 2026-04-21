import ChartDashboard from "./ChartDashobard";

const Charts = ({ setChartsDate , chartsDate, chartsData }) => {
    return(
        <div className="charts-container">
            <div className="charts-header">
                <div className="charts-header-start">
                    <h4>Performance Analytics</h4>
                    <span>Sales Trend over {chartsDate === "Month" ? '30 days' : '7 days' }</span>
                </div>
                <div className="charts-header-end"></div>
            </div>
            <div className="charts-main">
                <ChartDashboard chartsData={chartsData}/>
            </div>
        </div>
    );
};

export default Charts;