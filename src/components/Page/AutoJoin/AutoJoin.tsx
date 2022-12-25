import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";

export default function AutoJoin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");
  const { groupId } = useParams();
  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [groupId, navigate, userId]);

  return (
    <div>
      {loading && (
        <div
          style={{
            backgroundColor: "black",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "0.6",
            borderRadius: "10px"
          }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      )}
    </div>
  );
}
