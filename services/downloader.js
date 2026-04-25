const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { CACHE_DIR } = require("../config/config");

fs.ensureDirSync(CACHE_DIR);

async function downloadPage(url) {
    const start = Date.now();

    try {
        const res = await axios.get(url, { timeout: 5000 });

        const fileName = Buffer.from(url).toString("base64") + ".html";
        const filePath = path.join(CACHE_DIR, fileName);

        await fs.writeFile(filePath, res.data);

        return {
            url,
            status: res.status,
            ok: true,
            time: Date.now() - start,
            filePath
        };

    } catch (err) {
        return {
            url,
            status: err.response?.status || "ERROR",
            ok: false,
            time: Date.now() - start,
            filePath: null
        };
    }
}

module.exports = { downloadPage };