import { useEffect, useRef, useState } from "react"; //importing react hooks
import { XAxis, Bar, ResponsiveContainer, BarChart, Tooltip } from "recharts"; //imorting recharts library's components

import ToolTip from "./ToolTip";
import Cursor from "./Cursor"; //importing react component to customize recharts components

const ChartDashboard = ({ chartsData , chartsDate}) => { //importing props from parent component (Charts.jsx)
    
    const isMobile = window.innerWidth < 1200; //returning boolean if screensize is less than 1200 px in with (to toggle charts responsiveness scroll behaviour)

    const chartRef = useRef(null); //state to scroll at the charts end
    const [formattedData, setFormattedData] = useState([]); //state to dispaly formatted data of chartsData

    useEffect(() => {

        if (!chartsData?.salesOverTime) return; //returnign empty promise if data is undefined

        const salesMap = new Map(); //creating map to store formatted data as object

        chartsData.salesOverTime.forEach(item => { //going though every data object from salesOverTime
            const key = new Date(item.date).toISOString().split("T")[0]; //converting time
            salesMap.set(key, item); //setting converted time in map
        });

        const dateNumber = chartsDate == 'Month' ? 30 : 7; // defining dateNumber based on chartsDate state value (either is shows 30 or 7 days data)

        const monthArray = Array.from({ length: dateNumber }, (_, i) => { //filling empty data in one month or week period (if any)
            const d = new Date(); //defining current date
            d.setDate(d.getDate() - (dateNumber - 1 - i)); //defining previous dates from now to 30/7 days ago

            const key = d.toISOString().split("T")[0]; //restructuring date
            const found = salesMap.get(key); //checking if restructured date is in salesMap

            return {date: d.toLocaleDateString("en-US", {month: "2-digit",day: "2-digit",}),sales: found?.sales || 0,revenue: found?.revenue || 0}; //returning finilized data from arrow function
        });

        setFormattedData(monthArray); //setting filled array to state

    }, [chartsData?.salesOverTime]); //logic executes on this dependencies change

    useEffect(() => {
        
        const el = chartRef.current; //defining refs.current value
        if (!el || formattedData.length === 0) return; //returning empty promise if el varibale is undefined or formattedData is empty array

        requestAnimationFrame(() => {el.scrollLeft = el.scrollWidth}); //if data and ref is defined then scrolling at the end of the charts (when scroll is activated on smaller devices)

    }, [formattedData]); //logic executes on formattedData state change
    
    return (
        <div className="chart-dashboard-container" ref={chartRef}>
            {formattedData.length === 0 ? "empty" : 
                <div className="chart-dashboard-inner-container " style={{width: '100%' , maxWidth : formattedData.length * 60}} >
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart  data={formattedData} barCategoryGap={0} barGap={isMobile ? -40 :-30}>
                        <XAxis className="xAxis" fontSize={14} tick={{fill : '#10b981'}} axisLine={false} tickLine={false} dataKey="date" height={40} dy={15}/>

                        <Tooltip content={<ToolTip />} cursor={<Cursor/>} />

                        <Bar dataKey="revenue" fill="#187c5b" barSize={isMobile ? 40 : 30} radius={2}/>
                        <Bar dataKey="sales" fill="#10b981"  barSize={isMobile ? 40 : 30} radius={2}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
    </div>
    );
};

export default ChartDashboard; //exporting component