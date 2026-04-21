import { useEffect, useState } from "react";
import { XAxis, YAxis, Bar, ResponsiveContainer, BarChart, Tooltip } from "recharts";

const ChartDashboard = ({ chartsData }) => {

    
    const [formattedData, setFormattedData] = useState([]);

useEffect(() => {
    if (!chartsData?.salesOverTime) return;

    const salesMap = new Map();

    chartsData.salesOverTime.forEach(item => {
        salesMap.set(item.date, item);
    });

    const monthArray = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (30 - i));

        const dateStr = d.toISOString().split("T")[0];

        return salesMap.get(dateStr) || {
            date: dateStr,
            sales: 0,
            revenue: 0
        };
    });

    setFormattedData(monthArray);

}, [chartsData?.salesOverTime]);

console.log(formattedData)

    return (
        <div className="chart-dashboard-container">
            {formattedData.length == 0 ? 'asdasd' : 
            <ResponsiveContainer width="90%" height='400' >
                <BarChart data={formattedData}>

                    <XAxis dataKey="date" height={120} tickMargin={35} dy={15}  angle={-60}/>
                    <YAxis />

                    <Tooltip />
                    <Bar dataKey="sales" radius={2} fill="#187c5b" barSize={20} />
                    <Bar barSize={20} radius={2} dataKey="revenue" fill="#10b981" />

                </BarChart>
            </ResponsiveContainer>}
        </div>
    );
};

export default ChartDashboard;