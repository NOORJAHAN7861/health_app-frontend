import axios from "axios";

export const api = axios.create({
  baseURL: "https://healthapp-backend-production-a7de.up.railway.app",
  withCredentials: true,
});