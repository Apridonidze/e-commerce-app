import Charts from "./Charts"
import Stats from "./Stats"

const Analytics = ({ setChartsDate, chartsDate, chartsData }) => {
    return(
        <div className="analytics-container">
            <div className="analytics-start"><Charts setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/></div>
            <div className="analytics-end"><Stats chartsData={chartsData}/></div>
        </div>
    )
}

export default Analytics