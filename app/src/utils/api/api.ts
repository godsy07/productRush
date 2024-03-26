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

export const getCategories = async () => {
  const response = await apiRequest({ method: 'GET', auth: false, url: `${REST_API_URL}/category/get-categories` });
  if (response.status) return response.categories;
}

export const getParentCategories = async () => {
  const response = await apiRequest({ method: 'GET', auth: false, url: `${REST_API_URL}/category/get-parent-categories` });
  if (response.status) return response.categories;
}

export const getCategoryFilters = async () => {
  const response = await apiRequest({ method: 'GET', auth: false, url: `${REST_API_URL}/category/get-category-filters` });
  return response;
  // if (response.status) return response.categories;
}

interface AddCategoryOptions {
  name: string;
  parent_id: string;
  image: File[];
}

export const addCategory = async ({ name, parent_id, image }: AddCategoryOptions) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    if (parent_id) formData.append('parent_id', parent_id);
    formData.append("image", image[0]);

    const response = await axios({
      method: 'POST',
      data: formData,
      withCredentials: true,
      url:`${REST_API_URL}/category/add-category`,
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  } catch(e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || { status: false, message: "Unknown error occurred" };
    } else {
      console.log(e)
      return { status: false, message: "Something went wrong!!!" };
    }
  }
}
