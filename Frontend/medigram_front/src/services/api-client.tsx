import axios, { CanceledError } from "axios";

const baseImagesUrl = "http://localhost:3030/public/";

const apiClient = axios.create({
    baseURL: "http://localhost:3030",
});
apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

const imagesClient = axios.create({
    baseURL: baseImagesUrl,
});

export {CanceledError, apiClient, imagesClient, baseImagesUrl};