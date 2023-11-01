import axios from "axios";

export const getImages = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/image`);
  return res.data?.data;
};

export const deleteImages = async (ids: Array<string>) => {
  return axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/image`, ids);
};

export const uploadNewImage = async (data: { imageSrc: string }) => {
  return axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/image`, data);
};
