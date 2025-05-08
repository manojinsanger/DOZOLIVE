import { fetchToken } from "../controllers/fetchToken";
import { axiosInstance } from "./apiUrl";
import { Alert } from "react-native";


export const getRefer = async () => {
    const token = await fetchToken();
    if (!token) {
        console.log("No token available");
        return;
    }

    try {
        const response = await axiosInstance.get(`/refer`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        Alert.alert("Error", error.response?.data?.error || "An error occurred.");
        throw error;
    }
};

export const applyRefer = async (referralCode: string) => {
    const token = await fetchToken();
    if (!token) {
        console.log("No token available");
        return;
    }

    try {
        const response = await axiosInstance.post(`/refer/apply`, { referralCode }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        // console.error("Error fetching user profile:", error.response?.data);
        Alert.alert("Error", error.response?.data.error || "An error occurred while applying the referral code.");
        throw error;
    }
};