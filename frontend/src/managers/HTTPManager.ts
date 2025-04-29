import axios from "axios";
import { EnvironmentVariables } from "./EnvironmentVariables";
import { GetFromLocalStorage } from "@/functions/HandleLocalStorage";

export const HTTPManager = axios.create({
    timeout: 5000,
    baseURL: EnvironmentVariables.BACKEND_API_URL,
    headers: { "Content-Type": "application/json" },
});

HTTPManager.interceptors.request.use(
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

HTTPManager.interceptors.response.use(
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
