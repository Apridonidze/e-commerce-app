import { useEffect, useState } from "react";
import { XAxis, YAxis, Bar, ResponsiveContainer, BarChart, Tooltip } from "recharts";

const ChartDashboard = ({ chartsData }) => {

    
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

    return (
        <div className="chart-dashboard-container">
            {formattedData.length == 0 ? 'asdasd' : 
            <ResponsiveContainer width="95%" height='400' >
                <BarChart data={formattedData} barCategoryGap={0} barGap={-30}>

                    <XAxis axisLine={false} tickLine={false} dataKey="date" height={120} tickMargin={35} dy={15} angle={-60}/>

                    <Tooltip />

                    <Bar dataKey="revenue" radius={2} fill="#187c5b" barSize={30} />
                    <Bar dataKey="sales" radius={2} fill="#10b981" barSize={30} />

                </BarChart>
            </ResponsiveContainer>}
        </div>
    );
};

export default ChartDashboard;