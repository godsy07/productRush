import axios from 'axios';
import { REST_API_URL } from '../../config';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: string;
  auth?: boolean;
  data?: Record<string, any>;
}

const apiRequest = async ({ method, url, auth, data }: Partial<ApiRequestOptions> = {}) => {
  try {
    if (!method || !url || auth === undefined) {
      throw new Error('Missing required parameters');
    }
    const requestObj: {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      withCredentials?: boolean;
      data?: Record<string, any>;
    } = {
      url,
      method,
      withCredentials: auth
    };

    if (method === "POST" && data) requestObj.data = data;
    const response = await axios(requestObj);
    return response.data;
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || { status: false, message: "Unknown error occurred" };
    } else {
      console.log(e)
      return { status: false, message: "Something went wrong!!!" };
    }
  }
}

export const getUserDetails = async ({ user_id }: { user_id: string }) => {
  const response = await apiRequest({ method: 'GET', auth: false, url: `${REST_API_URL}/user/get-user/${user_id}` });
  return response;
}

export const loginUser = async ({ username, password }: { username: string, password: string }) => {
  const response = await apiRequest({ method: 'POST', auth: false, url: `${REST_API_URL}/user/login`, data: { email: username, password } });
  return response;
}

export const loginAdmin = async ({ username, password }: { username: string, password: string }) => {
  const response = await apiRequest({ method: 'POST', auth: false, url: `${REST_API_URL}/user/admin-login`, data: { email: username, password } });
  return response;
}
