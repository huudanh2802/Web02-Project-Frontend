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

  function setMockData() {
    const mockData = [
      {
        id: "1231312",
        email: "huudanh2802"
      },
      {
        id: "1233312",
        email: "huudanh2802"
      },
      {
        id: "1233312",
        email: "huudanh2802"
      }
    ];
    setMemberSelection(mockData);
  }

  useEffect(() => {
    setMockData();
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
