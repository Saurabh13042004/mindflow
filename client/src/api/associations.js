import axiosInstance from './axiosInstance';

export const shareAccessAssociation = async (data) => {
  try {
    const response = await axiosInstance.post(`/associations/${data.fileId}/share`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}