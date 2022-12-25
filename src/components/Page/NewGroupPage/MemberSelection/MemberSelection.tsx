/* eslint-disable no-unused-vars */
import React from "react";

import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import MemberRole from "../MemberRole/MemberRole";

import "./MemberSelection.css";
// eslint-disable-next-line import/order
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
