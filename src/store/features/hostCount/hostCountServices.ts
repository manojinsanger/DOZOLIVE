import { fetchToken } from '@/controllers/fetchToken';
import { axiosInstance } from '@/services/apiUrl';

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

export const fetchAgentHostCount = async (): Promise<{ totalHosts: number }> => {
  try {
    const response = await axiosInstance.get('roleChange/agent/host-count');
    console.log(response.data.data.totalHosts ,"this is the host count ")
    if (!response.data.success) {
      throw new Error('Failed to fetch host count');
    }
    const { totalHosts } = response.data.data;




    return  {totalHosts} ;
  } catch (error: any) {
    console.error('Failed to fetch agent host count:', error);
    return { totalHosts: 0 }; // Return a default value to satisfy the return type
  }
};