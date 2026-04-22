import Stats from "./Stats";
import Charts from "./Charts";
import EmptyCharts from "../../empty/EmptyCharts"; //importing react components

const Analytics = ({ setChartsDate, chartsDate, chartsData }) => { //recieving props form parent component (AdminDashboard.jsx)
    return(
        <div className="analytics-container my-5">
            <div className="analytics-start"><Stats chartsData={chartsData}/></div>
            <div className="analytics-end">
                {chartsData.length === 0 ? <EmptyCharts /> : <Charts setChartsDate={setChartsDate} chartsDate={chartsDate} chartsData={chartsData}/>}
            </div>
        </div>
    );
};

export default Analytics; //exporting component