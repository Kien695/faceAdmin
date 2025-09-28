import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
//get
export const getData = async (url, token) => {
  try {
    const response = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get error: ", error);
    throw error;
  }
};
//post
export const postData = async (url, formData, config = {}) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        ...(formData instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// PUT
export const putData = async (url, formData, config = {}) => {
  try {
    console.log(apiUrl + url);
    const response = await axios.put(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        ...(formData instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// DELETE
export const deleteData = async (url, token) => {
  try {
    console.log(apiUrl + url);
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("DELETE error:", error);
    throw error;
  }
};
