import { fetchToken } from "@/controllers/fetchToken";
import { apiUrl } from "./apiUrl";
import axios from "axios";


export const audienceLogin = async (channelName: string) => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }
        const response = await fetch(`${apiUrl}/agora/live?channelName=${channelName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const res = await response.json();
        return res;
    } catch (error) {
        alert(error)
        console.error('agoraaaaaaa', error);
    }
};

export const getLives = async () => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }
        const response = await fetch(`${apiUrl}/agora/live`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const res = await response.json();
        return res;
    } catch (error) {
        alert(error)
        console.error('agoraaaaaaa', error);
    }
};

export const getLiveById = async (id:string) => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }
        const response = await fetch(`${apiUrl}/agora/live/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const res = await response.json();
        return res;
    } catch (error) {
        alert(error)
        console.error('agoraaaaaaa', error);
    }
};


export const createLive = async (data: LiveSessionData) => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        data.tags.forEach(tag => formData.append("tags[]", tag));

        if (data.image) {
            if (typeof data.image === "string") {
                formData.append("image", {
                    uri: data.image,
                    name: "upload.jpg",
                    type: "image/jpeg",
                } as any);
            } else {
                formData.append("image", data.image);
            }
        }

        const response = await axios.post(`${apiUrl}/agora/create/live`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Agora Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Something went wrong");
    }
};

export const deleteLive = async (liveId: string) => {
    try {
        if (!liveId) {
            console.log("❌ Error: liveId is undefined or empty");
            return;
        }

        const token = await fetchToken();
        if (!token) {
            console.log("❌ Error: No token available");
            return;
        }

        console.log(`🔹 Deleting live session with ID: ${liveId}`);

        const response = await fetch(`${apiUrl}/agora/live/${liveId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            console.log("❌ API Error Response:", errorResponse);
            return;
        }

        const res = await response.json();
        console.log("✅ Live session deleted successfully:", res);
        return res;
    } catch (error) {
        console.error("❌ Error in deleteLive:", error);
        alert("Failed to delete live session.");
    }
};
