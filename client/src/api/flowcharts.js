import axiosInstance from './axiosInstance';

export const getAllFlowcharts = async () => {
  try {
    const response = await axiosInstance.get('/flowcharts');
    return response.data;
  } catch (error) {
    throw error;
  }
};
