
import { fetchToken } from '@/controllers/fetchToken';
import { axiosInstance } from '@/services/apiUrl';
import { Alert } from 'react-native';
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await fetchToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const getAgentDetailsForHost = async (hostId: string | number): Promise<any | null> => {
    try {
        const response = await axiosInstance.get('/agent/agentdetailforHosts', {
            params: { hostId },
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            Alert.alert('Error', response.data.error || 'Failed to fetch agent details');
            return null;
        }
    } catch (error: any) {
        console.error('Error fetching agent details:', error);
        Alert.alert('Error', error.response?.data?.error || 'Unexpected error occurred');
        return null;
    }
};