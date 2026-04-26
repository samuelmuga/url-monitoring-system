
"use client"
import React from "react";

function AnalyticsPanel({ summary, slow }) {
    return (
        <div>
            <h2>Analytics</h2>

            <p>Total: {summary.totalChecks}</p>
            <p>Success: {summary.successRate?.toFixed(2)}%</p>
            <p>Failure: {summary.failureRate?.toFixed(2)}%</p>
            <p>Avg Time: {summary.avgResponseTime} ms</p>

            <h3>Slow URLs</h3>
            <ul>
                {slow.map((s, i) => (
                    <li key={i}>
                        {s.url} - {Math.round(s.avg_time)} ms
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnalyticsPanel;