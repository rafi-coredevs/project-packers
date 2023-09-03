import axios from "axios";
export const BASE_URL = import.meta.env.VITE_SERVER_URL;

const config = {
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const postApi = async (endpoint, body) => {
  try {
    const res = await axios.post(
      `${BASE_URL + "/" + endpoint}`,
      body,
      config
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getApi = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL + "/" + endpoint}`, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const patchApi = async (endpoint, data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL + "/" + endpoint}`,
      data,

      config
    );

    return response;
  } catch (err) {
    return err;
  }
};
