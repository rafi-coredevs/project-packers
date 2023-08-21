import axios from "axios";
export const BASE_URL = "http://localhost:4000";

const config = {
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const postApi = async (endpoint, body) => {
  try {
    const res = await axios.post(
      `${BASE_URL + "/api" + endpoint}`,
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
    const response = await axios.get(`${BASE_URL + "/api" + endpoint}`, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const patchApi = async (endpoint, data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL + "/api" + endpoint}`,
      data,

      config
    );

    return response;
  } catch (err) {
    return err;
  }
};
