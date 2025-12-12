import { getKey } from "@/utils/storageKeys";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config) => {
  const accessToken = await getKey("accessToken");

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
