import React, { useEffect, useState } from "react";

import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import MemberRole from "../MemberRole/MemberRole";

import "./MemberSelection.css";
// eslint-disable-next-line import/order
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MemberSelection({
  newGroup,
  setNewGroup
}: {
  newGroup: NewGroupDTO;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupDTO>>;
}) {
  const [memberSelection, setMemberSelection] = useState<MemberRoleDTO[]>([]);

  function setData() {
    const localId = localStorage.getItem("id");

    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/memberselection/${localId}`
    })
      .then((response) => {
        setMemberSelection(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  }
  useEffect(() => {
    setData();
  }, []);

  const memberRole = memberSelection.map((memberData) => (
    <li className="memberRole">
      <MemberRole
        memberData={memberData}
        add
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />
    </li>
  ));

  return (
    <div className="member-wrapper">
      <ToastContainer />
      <ul className=" ulWrapper">{memberRole}</ul>
    </div>
  );
}
