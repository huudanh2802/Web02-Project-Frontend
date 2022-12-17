import mem from "mem";
import { ToastContainer, toast } from "react-toastify";
import axiosPublic from "./axiosPublic";
import "react-toastify/dist/ReactToastify.css";

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
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    window.location = `${process.env.REACT_APP_BASE_URL}/login`;
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
  }
  return (
    <>
      <ToastContainer />
      <div />
    </>
  );
};

const maxAge = 1000;

// eslint-disable-next-line import/prefer-default-export
export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge
});
