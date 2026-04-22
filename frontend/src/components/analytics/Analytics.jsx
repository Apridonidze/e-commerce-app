import EmptyCharts from "../../empty/EmptyCharts"
import Charts from "./Charts"
import Stats from "./Stats"

const Analytics = ({ setChartsDate, chartsDate, chartsData }) => {
    return(
        <div className="analytics-container my-5">
            <div className="analytics-start"><Stats chartsData={chartsData}/></div>
            <div className="analytics-end">
                {chartsData.length !== 0 ? <EmptyCharts /> : <Charts setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/>}
            </div>
        </div>
    )
}

export default Analytics