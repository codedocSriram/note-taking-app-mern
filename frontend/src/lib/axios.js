import axios from "axios";

export const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/api"
        : "/api";
const api = axios.create({
    baseURL: BASE_URL,
});
