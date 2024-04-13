import axios from "axios";
import { api, isAuthenticated } from "../utils/api";

const { token } = isAuthenticated();

export const Axios = axios.create({
  baseURL: api,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + token,
  },
});
