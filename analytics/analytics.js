const db = require("../db/db");

function getSummary() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM results`, (err, rows) => {
            if (err) return reject(err);

            const total = rows.length;
            const success = rows.filter(r => r.ok).length;
            const failed = total - success;

            const avgTime =
                rows.reduce((sum, r) => sum + (r.response_time || 0), 0) /
                (total || 1);

            resolve({
                totalChecks: total,
                successRate: total ? (success / total) * 100 : 0,
                failureRate: total ? (failed / total) * 100 : 0,
                avgResponseTime: Math.round(avgTime)
            });
        });
    });
}
function getProblemUrls() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT url, COUNT(*) as failures
            FROM results
            WHERE ok = 0
            GROUP BY url
            ORDER BY failures DESC
            LIMIT 10
        `, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
function getSlowUrls() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT url, AVG(response_time) as avg_time
            FROM results
            GROUP BY url
            ORDER BY avg_time DESC
            LIMIT 10
        `, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports = {
    getSummary,
    getProblemUrls,
    getSlowUrls
};
