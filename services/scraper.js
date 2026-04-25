const fs = require("fs-extra");
const cheerio = require("cheerio");
const db = require("../db/db");

async function scrapeAndValidate(result) {
    if (!result.filePath) return result;

    try {
        const html = await fs.readFile(result.filePath, "utf-8");
        const $ = cheerio.load(html);

        const title = $("title").text() || "No title";
        const hasLogin = $("input[type='password']").length > 0;

        db.run(`
            INSERT INTO results (url, status, ok, response_time, title, has_login)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            result.url,
            result.status,
            result.ok,
            result.time,
            title,
            hasLogin ? 1 : 0
        ]);

        return {
            ...result,
            title,
            hasLogin
        };

    } catch (err) {
        return result;
    }
}

module.exports = { scrapeAndValidate };