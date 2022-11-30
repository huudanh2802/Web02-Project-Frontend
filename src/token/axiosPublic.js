// @/src/common/axiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosPublic;
