
import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Your Flask backend

export const uploadPhoto = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload-photo`, formData);
};

export const uploadVideo = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload-video`, formData);
};

export const sendWebcamImage = (image) => {
  return axios.post(`${API_URL}/webcam`, { image });
};

export const analyzeCCTV = (url) => {
  return axios.post(`${API_URL}/cctv`, { url });
};

export const fetchEmotionStats = () => axios.get(`${API_URL}/analytics`);
