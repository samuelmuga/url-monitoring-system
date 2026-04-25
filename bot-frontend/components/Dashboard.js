

import React from "react";
import { useData } from "../hooks/useData";
import ResultsTable from "./ResultsTable";
import AnalyticsPanel from "./AnalyticsPanel";
import Charts from "./Charts";

function Dashboard() {
    const {
        results,
        summary,
        problems,
        slow,
        lastRun,
        loading,
        runCheck
    } = useData();

    return (
        <div>

            <button onClick={runCheck} disabled={loading}>
                {loading ? "Running..." : "Run Check"}
            </button>

            <p>Last Run: {lastRun || "Never"}</p>

            <AnalyticsPanel summary={summary} slow={slow} />

            <Charts summary={summary} problems={problems} />

            <ResultsTable results={results} />

        </div>
    );
}

export default Dashboard;