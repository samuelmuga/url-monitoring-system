const fs = require("fs-extra");

async function cleanup(filePath) {
    if (!filePath) return;
    try {
        await fs.remove(filePath);
    } catch (e) {}
}

module.exports = { cleanup };