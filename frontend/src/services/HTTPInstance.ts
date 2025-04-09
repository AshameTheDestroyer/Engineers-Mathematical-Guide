import axios from "axios";
import { GetFromLocalStorage } from "@/functions/HandleLocalStorage";

const HTTPInstance = axios.create({
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    baseURL: import.meta.env["VITE_BACKEND_API_URL"],
});

HTTPInstance.interceptors.request.use(
    (config) => {
        const token = GetFromLocalStorage("token");
        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

HTTPInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(
                "Response Error:",
                error.response.status,
                error.response.data
            );
        } else if (error.request) {
            console.error("No Response Received:", error.request);
        } else {
            console.error("Request Setup Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default HTTPInstance;
