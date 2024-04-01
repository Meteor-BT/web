import axios from "axios";

export function http(version = "v1") {
    const client = axios.create({
        baseURL: import.meta.env.VITE_API_URL + "/api/" + version,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 1000 * 60 * 10, // 10 minutes
    });
    return client;
}
