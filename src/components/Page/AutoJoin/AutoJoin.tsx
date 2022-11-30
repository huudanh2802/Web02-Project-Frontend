import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosPrivate } from "../../../token/axiosPrivate";

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
        alert("Join Successfully");
        navigate(`/group/detail/${response.data}`);
      } else {
        alert("Join failed");
        navigate("/");
      }
    });
  }, [groupId, navigate, userId]);

  return <div />;
}
