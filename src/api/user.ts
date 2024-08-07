// api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_BASE_URL = "http://65.0.131.234:8000";


interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    confirmPassword:string;
  }
  
  interface LoginData {
    email: string;
    password: string;
  }
  interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const signup = async (userData:SignupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/create`, userData);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (userData:LoginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, userData);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data.message);
  }
};

export const getUserProfile = async (token: string) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data.message);
  }
};

export const logout = async (token: string) => {
  try {
    await axios.get(`${API_BASE_URL}/user/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};