import React, { Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import GroupDTO from "../../../dtos/GroupDTO";

import "./Kard.css";

function GroupKard({ group, index }: { group: GroupDTO; index: Key }) {
  const navigate = useNavigate();

  const viewGroup = () => {
    const link = `/group/detail/${group.id.toString()}`;
    navigate(link);
  };

  return (
    <Card key={index} className="kard" onClick={viewGroup}>
      <div className="kard-header">
        <img
          src={`/assets/card-bg-${Math.floor(Math.random() * 8)}.jpg`}
          alt="bg"
        />
      </div>
      <div className="kard-body">
        <header>{group.name}</header>
        <span className="tag tag-teal">
          {group.memberNum} Member{group.memberNum === 1 ? "" : "s"}
        </span>
        <div className="time">
          <FaCalendar className="mx-2" />
          <small>
            {moment(group.createdAt.toString()).format("MMMM Do, YYYY")}
          </small>
        </div>
      </div>
    </Card>
  );
}

export default GroupKard;
