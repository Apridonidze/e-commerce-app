import { useEffect, useRef, useState } from "react";
import { XAxis, Bar, ResponsiveContainer, BarChart, Tooltip } from "recharts";

import ToolTip from "./ToolTip";

const ChartDashboard = ({ chartsData , chartsDate}) => {
    
    const chartRef = useRef(null)
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {

        if (!chartsData?.salesOverTime) return;

        const salesMap = new Map();

        chartsData.salesOverTime.forEach(item => {
            const key = new Date(item.date).toISOString().split("T")[0];

            salesMap.set(key, item);
        });

        const dateNumber = chartsDate == 'Month' ? 30 : 7 

        const monthArray = Array.from({ length: dateNumber }, (_, i) => {

            const d = new Date();
            d.setDate(d.getDate() - (dateNumber - 1 - i));

            const key = d.toISOString().split("T")[0];
            const found = salesMap.get(key);

            return {date: d.toLocaleDateString("en-US", {month: "2-digit",day: "2-digit",}),sales: found?.sales || 0,revenue: found?.revenue || 0};

        });

        setFormattedData(monthArray);

    }, [chartsData?.salesOverTime]);
    
    const isMobile = window.innerWidth < 1200;

    useEffect(() => {
        
        const el = chartRef.current;
        if (!el || formattedData.length === 0) return;

        requestAnimationFrame(() => {el.scrollLeft = el.scrollWidth;});

    }, [formattedData]);
    
    return (
        <div className="chart-dashboard-container" ref={chartRef}>
            {formattedData.length === 0 ? "empty" : 
                <div className="chart-dashboard-inner-container" style={{width: '100%' , maxWidth : formattedData.length * 60}} >
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart  data={formattedData} barCategoryGap={0} barGap={isMobile ? -20 :-30}>
                        <XAxis className="xAxis" fontSize={14} axisLine={false} tickLine={false} dataKey="date" height={120} dy={15}/>

                        <Tooltip content={<ToolTip />} />

                        <Bar dataKey="revenue" fill="#187c5b" barSize={isMobile ? 20 : 30} radius={2}/>
                        <Bar dataKey="sales" fill="#10b981"  barSize={isMobile ? 20 : 30} radius={2}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
    </div>
    );
};

export default ChartDashboard;