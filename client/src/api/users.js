import axios from "./axiosInstance";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export const loginUser = async (credentials) => {
  return axios.post("/users/login", credentials);
};

export const registerUser = async (userData) => {
  return axios.post("/users/register", userData);
};

export const changePassword = async (userData) => {
  return axios.put("/users/change-password", userData);
};

export const changeName = async (userData) => {
  return axios.put("/users/change-name", userData);
};

export const healthCheck = async () => {
  return axios.post('/check-token', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};
