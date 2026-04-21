import Charts from "./Charts"

const Analytics = ({ setChartsDate, chartsDate, chartsData }) => {
    return(
        <div className="analytics-container">
            <div className="analytics-start"><Charts setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/></div>
        </div>
    )
}

export default Analytics