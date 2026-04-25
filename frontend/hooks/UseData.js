import { useState, useEffect } from "react";
import { api } from "../api";

export function useData() {
    const [results, setResults] = useState([]);
    const [summary, setSummary] = useState({});
    const [problems, setProblems] = useState([]);
    const [slow, setSlow] = useState([]);
    const [lastRun, setLastRun] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadAll = async () => {
        const res = await api.getResults();
        setResults(res.data.results || []);
        setLastRun(res.data.lastRun);

        const s = await api.getSummary();
        const p = await api.getProblems();
        const sl = await api.getSlow();

        setSummary(s.data);
        setProblems(p.data);
        setSlow(sl.data);
    };

    const runCheck = async () => {
        setLoading(true);
        await api.runCheck();
        await loadAll();
        setLoading(false);
    };

    useEffect(() => {
        loadAll();
    }, []);

    return {
        results,
        summary,
        problems,
        slow,
        lastRun,
        loading,
        runCheck
    };
}

