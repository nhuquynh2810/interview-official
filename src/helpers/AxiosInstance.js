import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.39:7777/'
        // baseURL: 'http:// 172.16.78.173:7777/'
    });
    // cmd -----> ipconfig -----> IPv4 Address (192.168.1.1)
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = '';
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;