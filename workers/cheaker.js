const pLimit = require("p-limit");
const { fetchUrls } = require("../services/sheets");
const { downloadPage } = require("../services/downloader");
const { scrapeAndValidate } = require("../services/scraper");
const { cleanup } = require("../services/cleanup");
const { CONCURRENCY } = require("../config/config");

let cache = {
    lastRun: null,
    results: []
};

async function runCheck() {
    const urls = await fetchUrls();
    const limit = pLimit(CONCURRENCY);

    const results = await Promise.all(
        urls.map(url =>
            limit(async () => {
                const downloaded = await downloadPage(url);
                const scraped = await scrapeAndValidate(downloaded);
                await cleanup(downloaded.filePath);
                return scraped;
            })
        )
    );

    cache = {
        lastRun: new Date(),
        results
    };

    return cache;
}

function getCache() {
    return cache;
}

module.exports = { runCheck, getCache };