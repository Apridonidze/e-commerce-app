import ChartDashboard from "./ChartDashobard";//importing chart dashboard

const Charts = ({ setChartsDate , chartsDate, chartsData }) => { //importing proprs from parent component (Analytics.jsx)

    return(
        <div className="charts-container mt-4 mx-2">

            <div className="charts-header">
                <div className="charts-header-start">
                    <h4><i class="fa-solid fa-chart-column"></i> Performance Analytics</h4>
                </div>
                <div className="charts-header-end">
                    <button className={`btn border-0 chartsDate ${chartsDate == 'Week' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== 'Week' ? "Week" : prev)}>7 Days</button>
                    <button className={`btn border-0 chartsDate ${chartsDate == 'Month' ? 'active' : ""}`} onClick={() => setChartsDate(prev => prev !== "Month" ? "Month" : prev)}>30 Days</button>
                </div>
            </div>

            <div className="charts-main">
                <ChartDashboard chartsData={chartsData} chartsDate={chartsDate}/>
            </div>

        </div>
    );
};

export default Charts;//exporting component