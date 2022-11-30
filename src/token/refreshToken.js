import mem from "mem";
import axiosPublic from "./axiosPublic";

// eslint-disable-next-line consistent-return
const refreshTokenFn = async () => {
  const token = localStorage.getItem("token");

  try {
    const currentSession = {
      id: localStorage.getItem("id")
    };
    // eslint-disable-next-line no-throw-literal
    if (!currentSession) throw "Logged out";
    const response = await axiosPublic.post("/refresh", {
      currentSession
    });

    const { session } = response.data;

    if (session.token !== token) {
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    }

    localStorage.setItem("id", session.id);
    localStorage.setItem("email", session.email);
    localStorage.setItem("token", session.id);

    return session;
  } catch (error) {
    alert("Please log in");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }
};

const maxAge = 1000;

// eslint-disable-next-line import/prefer-default-export
export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge
});
