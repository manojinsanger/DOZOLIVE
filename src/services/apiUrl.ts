import { fetchToken } from "@/controllers/fetchToken";
import axios from "axios";

// export const apiUrl = "http://192.168.1.39:3010/api";
// export const apiUrl = "http://localhost:3010/api";
export const apiUrl = "http://10.0.2.2:3010/api";
export const socketUrl = "http://10.0.2.2:3010";
// export const apiUrl = "http://5.161.191.228:3010/api";
// export const socketUrl = "http://5.161.191.228:3010";
// export const apiUrl = "https://backend.dozolive.com/api";
// export const apiUrl = "http://192.168.31.95:3010/api";


export const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});


// https://backend.dozolive.com
// http://localhost:3010/api



