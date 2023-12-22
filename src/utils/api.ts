import axios, { AxiosRequestConfig } from 'axios';
import { IUser } from './types';

const CONFIG: AxiosRequestConfig = { withCredentials: true, baseURL: 'http://localhost:3001/api' };

export const getAuthStatus = () => {
    return axios.get<IUser>('/auth/status', CONFIG);
};
