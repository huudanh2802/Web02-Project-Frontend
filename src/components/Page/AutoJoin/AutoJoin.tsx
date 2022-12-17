import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "react-toastify/dist/ReactToastify.css";

export default function AutoJoin() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { groupId } = useParams();
  useEffect(() => {
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/autojoin/${groupId}`,
      data: {
        userId
      }
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Join Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setTimeout(() => {
          navigate(`/group/detail/${response.data}`);
        });
      } else {
        toast.error("Join failed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    });
  }, [groupId, navigate, userId]);

  return (
    <>
      <ToastContainer />
      <div />
    </>
  );
}
