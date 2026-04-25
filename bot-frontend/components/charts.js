import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    PieChart, Pie, Cell
} from "recharts";

function Charts({ summary, problems }) {
    const pieData = [
        { name: "Success", value: summary.successRate || 0 },
        { name: "Failure", value: summary.failureRate || 0 }
    ];

    return (
        <div style={{ display: "flex", gap: "40px" }}>

            {/* Pie Chart */}
            <div>
                <h3>Success vs Failure</h3>
                <PieChart width={300} height={300}>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        outerRadius={100}
                        label
                    >
                        <Cell />
                        <Cell />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            {/* Bar Chart */}
            <div>
                <h3>Top Failed URLs</h3>
                <BarChart width={400} height={300} data={problems}>
                    <XAxis dataKey="url" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="failures" />
                </BarChart>
            </div>

        </div>
    );
}

export default Charts;