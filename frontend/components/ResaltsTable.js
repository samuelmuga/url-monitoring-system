

import React from "react";

function ResultsTable({ results }) {
    return (
        <table border="1" cellPadding="5">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Title</th>
                    <th>Login</th>
                </tr>
            </thead>
            <tbody>
                {results.map((r, i) => (
                    <tr key={i}>
                        <td>{r.url}</td>
                        <td style={{ color: r.ok ? "green" : "red" }}>
                            {r.ok ? "OK" : "FAIL"} ({r.status})
                        </td>
                        <td>{r.time} ms</td>
                        <td>{r.title || "-"}</td>
                        <td>{r.hasLogin ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ResultsTable;