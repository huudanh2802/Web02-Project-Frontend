import axios from "axios";
import React, { useEffect, useState } from "react";

import MemberRoleDTO from "../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../dtos/NewGroupDTO";
import MemberRole from "../MemberRole/MemberRole";

import "./MemberSelection.css";

export default function MemberSelection({
  newGroup,
  setNewGroup
}: {
  newGroup: NewGroupDTO;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupDTO>>;
}) {
  const [memberSelection, setMemberSelection] = useState<MemberRoleDTO[]>([]);

  function setData() {
    axios({
      method: "get",
      url: `http://localhost:8081/user/memberselection/63803669e9913569938867be`
    }).then((response) => {
      setMemberSelection(response.data);
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
      <ul className=" ulWrapper">{memberRole}</ul>
    </div>
  );
}
