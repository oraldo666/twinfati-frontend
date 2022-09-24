import axios from "axios";
import { BACKEND_URL } from "./constants/constatns";

export const axiosCreatePostInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
