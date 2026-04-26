

import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000"
});

export const api = {
    runCheck: () => API.get("/check"),
    getResults: () => API.get("/results"),
    getSummary: () => API.get("/analytics/summary"),
    getProblems: () => API.get("/analytics/problems"),
    getSlow: () => API.get("/analytics/slow")
};