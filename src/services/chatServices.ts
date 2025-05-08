import { fetchToken } from "../controllers/fetchToken";
import { axiosInstance } from "./apiUrl";
import { formatMessage } from "../utils/date";

export const fetchChatHistory = async (
  receiverId: string
) => {
  const token = await fetchToken();
  if (!token) {
    console.log("No token available");
    return;
  }

  try {
    const response = await axiosInstance.get(
      `/chat/history/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("📜 Chat History:", response.data.data);

    return response.data.data.map(formatMessage);
  } catch (error) {
    console.error("⚠️ Error fetching chat history:", error);
    return [];
  }
};

export const chatUserList = async (page = 1, limit = 10) => {
  const token = await fetchToken();
  if (!token) {
    console.log("No token available");
    return;
  }

  try {
    const response = await axiosInstance.get(`/chat/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        limit,
      },
    });

    // console.log("user: ", response);

    return response.data;
  } catch (error) {
    console.error("⚠️ Error fetching chat user list:", error);
    return {
      success: false,
      data: {
        users: [],
        totalPages: 0,
      },
    };
  }
};

export const sendMessage = async (
  storedUserId: string,
  receiverId: string,
  message: string
) => {
  const token = await fetchToken();
  if (!token) {
    console.log("No token available");
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/chat/send`,
      {
        senderId: storedUserId,
        receiverId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("⚠️ Error sending message:", error);
    return null;
  }
};

export const acceptChatRequest = async (
  storedUserId: string,
  requestId: string
) => {
  const token = await fetchToken();
  if (!token) {
    console.log("No token available");
    return;
  }

  try {
    const response = await axiosInstance.post(
      `/chat/accept`,
      {
        userId: storedUserId,
        requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("⚠️ Error accepting chat request:", error);
    return null;
  }
};

export const fetchUserChatRequest = async (receiverId: string) => {
  try {
    const token = await fetchToken();
    if (!token) {
      console.log("No token available");
      return;
    }

    const res = await axiosInstance.get(`/chat/user/check/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error while fetching chat request: ", error);
  }
};
