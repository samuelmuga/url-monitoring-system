const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const apiRoutes = require("./routes/api");
const { runCheck } = require("./workers/checker");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", apiRoutes);

// auto run every 5 min
cron.schedule("*/5 * * * *", () => {
    console.log("Auto check running...");
    runCheck();
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});