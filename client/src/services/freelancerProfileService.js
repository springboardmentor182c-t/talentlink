import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/profiles/";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProfiles = () => {
  return axios.get(API_URL);
};

export const createProfile = (data) => {
  return axios.post(API_URL, data, getAuthHeader());
};

export const updateProfile = (id, data) => {
  return axios.patch(`${API_URL}${id}/`, data, getAuthHeader());
};

export const deleteProfile = (id) => {
  return axios.delete(`${API_URL}${id}/`, getAuthHeader());
};
