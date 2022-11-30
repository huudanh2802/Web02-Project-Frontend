// @/src/common/axiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosPublic;
