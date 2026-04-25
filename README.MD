🚀 URL Monitoring & Analytics System

A full-stack URL monitoring system that:

- 📄 Fetches URLs from Google Sheets
- 🌐 Checks if they load correctly
- 🔍 Scrapes page content
- 💾 Stores results in SQLite
- 📊 Provides analytics + charts (React dashboard)

---

🧠 Features

- ✅ Google Sheets integration (via service account JSON)
- ⚡ Concurrent URL checking with retries
- 🧵 Worker-style pipeline (download → scrape → store → cleanup)
- 💾 SQLite database for persistence
- 📊 Analytics engine (failure rate, slow URLs, etc.)
- 📈 React dashboard with charts
- ⏰ Auto-run scheduler (cron)
- 🧩 Modular backend + frontend architecture

---

📁 Project Structure

project/
│
│── server.js
│── config/
│── db/
│── services/
│── workers/
│── routes/
│── cache/
│
│── frontend/
│    ├── src/
│    └── package.json
│
│── credentials.json
│── package.json

---

⚙️ Setup

1. Clone & install

git clone https://github.com/samuelmuga/url-monitoring-system.git
cd project
npm install
cd frontend
npm install

---

2. Google Sheets Setup

1. Go to Google Cloud Console
2. Enable Google Sheets API
3. Create a Service Account
4. Download "credentials.json"
5. Place it in the root or backend folder
6. Share your Google Sheet with the service account email

---

3. Configure project

Edit:

backend/config/config.js

SPREADSHEET_ID = "your_sheet_id"
RANGE = "Sheet1!A:A"

---

🚀 Running the App

From root:

npm run monitor

This starts:

- ⚙️ Backend (Express API)
- 🌐 Frontend (React dashboard)
- 🔁 Worker + cron jobs

---

🌐 API Endpoints

Endpoint| Description
"/check"| Run URL check manually
"/results"| Get latest results
"/history"| Get stored results
"/analytics/summary"| Overview stats
"/analytics/problems"| Most failing URLs
"/analytics/slow"| Slowest URLs

---

📊 Analytics

Tracks:

- Success vs failure rate
- Average response time
- Most failing URLs
- Slowest URLs

---

🧵 Pipeline Flow

Google Sheets
      ↓
Fetch URLs
      ↓
Download (Axios)
      ↓
Cache (/cache)
      ↓
Scrape (Cheerio)
      ↓
Store (SQLite)
      ↓
Cleanup

---

⚠️ Notes

- Cache files are temporary and deleted after processing
- Concurrency is limited to avoid overloading servers

💬 Summary

This project is essentially a:

«mini uptime monitoring + scraping + analytics platform»

👨‍💻 Author

Built as a full-stack monitoring system project.
