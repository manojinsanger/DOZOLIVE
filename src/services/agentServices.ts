import axios from 'axios';
import { axiosInstance } from './apiUrl';

interface SearchAgentResponse {
  status: string;
  data: {
    liveId: number;
    agentId: string;
    profileImage: string;
    name: string;
  } | null;
  message: string;
}
interface RecentHostsResponse {
  success: boolean;
  data: Array<{
    id: number ;
    specialId: string | null;
    time: string;
    data: string;
    status: string;
  }>;
  error?: string;
}
interface JoinAgencyResponse {
  success: boolean;
  data?: {
    newRole: string;
    userId: string;
    agentId: string;
    agentHostId: string;
    userName: string;
    userLiveId: number;
    userSpecialId: string;
    agentLiveId: number;
    agentSpecialId: string;
  };
  error?: string;
}

export const searchAgent = async (userId: string): Promise<SearchAgentResponse> => {
  try {
    const response = await axiosInstance.get<SearchAgentResponse>(
      `/agent/searchagent`,
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to search agent');
  }
};


export const joinAgency = async (payload: {
  userId: string;
  agentId: string;
}): Promise<JoinAgencyResponse> => {
  try {
    const response = await axiosInstance.post<JoinAgencyResponse>(
      `/roleChange/normalusertohost`,
      payload
    );
    console.log(response.data)
    return response.data;
   
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Join agency error:', error);

    // Extract error message from Axios error
    let errorMessage = 'Failed to join agency';
    if (error.response?.data?.error) {
      // Use backend's error message if available
      errorMessage = error.response.data.error;
    } else if (error.message) {
      // Fallback to Axios error message
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};
export const assignUserToHost = async (payload: {
  userLiveId: string;
  agentId: string;
}): Promise<JoinAgencyResponse> => {
  try {
    const response = await axiosInstance.post<JoinAgencyResponse>(
      `/roleChange/normalusertohostbyagent`,
      payload
    );
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Failed to assign user to host :', error.message);

    // Extract error message from Axios error
    let errorMessage = 'Failed to assign user';
    if (error.response?.data?.error) {
      // Use backend's error message if available
      errorMessage = error.response.data.error;
    } else if (error.message) {
      // Fallback to Axios error message
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};
export const fetchRecentHosts = async (agentId: string): Promise<RecentHostsResponse> => {
  try {
    const response = await axiosInstance.get<RecentHostsResponse>(
      `agent/recentHosts`,
      {
        params: { agentId },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Failed to fetch history :', error);

    // Extract error message from Axios error
    let errorMessage = 'Failed to fetch host history';
    if (error.response?.data?.error) {
      // Use backend's error message if available
      errorMessage = error.response.data.error;
    } else if (error.message) {
      // Fallback to Axios error message
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};


