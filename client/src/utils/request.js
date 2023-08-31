import axios from "axios";

import NProgress from "nprogress";
import { config } from "../constants";
import { toast } from "react-toastify";
const request = axios.create({
  baseURL: config.base_url,
  timeout: config.time_out,
});

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token")
      ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      : "";
    document.querySelectorAll("*").forEach((ele) => {
      ele.classList.add("p-event-none");
    });
    NProgress.start();
    return config;
  },
  (error) => {
    document.querySelectorAll("*").forEach((ele) => {
      ele.classList.remove("p-event-none");
    });
    NProgress.done();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    document.querySelectorAll("*").forEach((ele) => {
      ele.classList.remove("p-event-none");
    });
    return response;
  },
  (error) => {
    NProgress.done();
    document.querySelectorAll("*").forEach((ele) => {
      ele.classList.remove("p-event-none");
    });
    if (error.message.includes("5000")) {
      toast.error("Internal Server Error");
    } else if (error.response) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
    if (error?.response?.status === 401) {
      document.querySelectorAll("*").forEach((ele) => {
        ele.style.pointerEvents = "none";
      });
      // logout user from store
      localStorage.removeItem("token");
      toast.error("Session expired, please login again.");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default request;

// ? Path: src/utils/request.js
