import axios from "axios";
import { env } from "../config/env";
import { tokenStorage } from "./storage";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000
});

http.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
