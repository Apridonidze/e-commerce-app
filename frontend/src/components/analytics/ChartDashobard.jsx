import { useEffect, useRef, useState } from "react";
import { XAxis, YAxis, Bar, ResponsiveContainer, BarChart, Tooltip } from "recharts";

import ToolTip from "./ToolTip";

const ChartDashboard = ({ chartsData }) => {
    
    const chartRef = useRef(null)
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {

        if (!chartsData?.salesOverTime) return;

        const salesMap = new Map();

        chartsData.salesOverTime.forEach(item => {
            const key = new Date(item.date).toISOString().split("T")[0];

            salesMap.set(key, item);
        });

        const monthArray = Array.from({ length: 30 }, (_, i) => {

            const d = new Date();
            d.setDate(d.getDate() - (29 - i));

            const key = d.toISOString().split("T")[0];
            const found = salesMap.get(key);

            return {date: d.toLocaleDateString("en-US", {month: "2-digit",day: "2-digit",}),sales: found?.sales || 0,revenue: found?.revenue || 0};

        });

        setFormattedData(monthArray);

    }, [chartsData?.salesOverTime]);
    
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        
        const el = chartRef.current;
        if (!el || formattedData.length === 0) return;

        requestAnimationFrame(() => {el.scrollLeft = el.scrollWidth;});

    }, [formattedData]);
    
    return (
        <div className="chart-dashboard-container" ref={chartRef}>
            {formattedData.length == 0 ? 'empty' : 
                <div style={{ minWidth: isMobile ? formattedData.length * 60 : '768px' }} >
                    <ResponsiveContainer width="100%" height='400'>
                        <BarChart data={formattedData} barCategoryGap={0} barGap={-30}>

                            <XAxis className="xAxis" fontSize={14}  axisLine={false} tickLine={false} dataKey="date" height={120} dy={15}/>

                            <Tooltip content={<ToolTip />}/>

                            <Bar dataKey="revenue" barSize={30} fill="#187c5b" radius={2}/>
                            <Bar dataKey="sales" barSize={30} fill="#10b981" radius={2}/>

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>
    );
};

export default ChartDashboard;