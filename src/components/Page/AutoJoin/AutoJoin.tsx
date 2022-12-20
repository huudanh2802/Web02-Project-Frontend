import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";

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
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Join Successfully!", {
            className: "toast_container"
          });
          setTimeout(() => {
            navigate(`/group/detail/${response.data}`);
          });
        } else {
          toast.error("Join failed!", {
            className: "toast_container"
          });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }, [groupId, navigate, userId]);

  return <div />;
}
