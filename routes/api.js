const express = require("express");
const router = express.Router();
const { runCheck, getCache } = require("../workers/checker");
const db = require("../db/db");

router.get("/check", async (req, res) => {
    const data = await runCheck();
    res.json(data);
});

router.get("/results", (req, res) => {
    res.json(getCache());
});

router.get("/history", (req, res) => {
    db.all("SELECT * FROM results ORDER BY checked_at DESC LIMIT 100", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
const {
    getSummary,
    getProblemUrls,
    getSlowUrls
} = require("../analytics/analytics");

router.get("/analytics/summary", async (req, res) => {
    res.json(await getSummary());
});

router.get("/analytics/problems", async (req, res) => {
    res.json(await getProblemUrls());
});

router.get("/analytics/slow", async (req, res) => {
    res.json(await getSlowUrls());
});
module.exports = router;