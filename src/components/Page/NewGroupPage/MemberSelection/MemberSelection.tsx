/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import MemberRole from "../MemberRole/MemberRole";

import "./MemberSelection.css";
// eslint-disable-next-line import/order
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Common/Toast/ToastStyle.css";

export default function MemberSelection({
  newGroup,
  setNewGroup,
  memberSelection,
  removeMember
}: {
  newGroup: NewGroupDTO;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupDTO>>;
  memberSelection: MemberRoleDTO[];
  removeMember: (event: any) => void;
}) {
  const memberRole = memberSelection.map((memberData) => (
    <li className="memberRole">
      <MemberRole
        memberData={memberData}
        add
        newGroup={newGroup}
        setNewGroup={setNewGroup}
        removeMember={(e) => removeMember(e)}
      />
    </li>
  ));

  return (
    <div>
      <ul className=" ulWrapper">{memberRole}</ul>
    </div>
  );
}
