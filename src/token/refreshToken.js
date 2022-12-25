import mem from "mem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosPublic from "./axiosPublic";
import "../components/Common/Toast/ToastStyle.css";

// eslint-disable-next-line consistent-return
const refreshTokenFn = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    const currentSession = {
      id: localStorage.getItem("id")
    };
    // eslint-disable-next-line no-throw-literal
    if (!currentSession) throw "Logged out";
    else {
      const response = await axiosPublic.post("/refresh", {
        currentSession
      });
      const { session } = response.data;
      if (session.token !== token) {
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");
      }
      localStorage.setItem("id", session.id);
      localStorage.setItem("email", session.email);
      localStorage.setItem("token", session.id);

      return session;
    }
  } catch (error) {
    toast.error("Please login to continue", {
      className: "toast_container"
    });
    window.location = `${process.env.REACT_APP_BASE_URL}/login`;
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
  }
};

const maxAge = 1000;

// eslint-disable-next-line import/prefer-default-export
export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge
});
