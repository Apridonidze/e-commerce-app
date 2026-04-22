import Charts from "./Charts"
import Stats from "./Stats"
const Analytics = ({ setChartsDate, chartsDate, chartsData }) => {
    return(
        <div className="analytics-container my-5">
            <div className="analytics-end"><Stats chartsData={chartsData}/></div>
            <div className="analytics-end"><Charts setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/></div>
        </div>
    )
}

export default Analytics