import React, { useState, useEffect } from "react";
import { Card, Accordion, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeItem } from "../../../helpers/functions";
import MemberDTO from "../../../dtos/MemberDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import ModifyGroupDTO from "../../../dtos/ModifyGroupDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "react-toastify/dist/ReactToastify.css";
import "../Toast/ToastStyle.css";

function UserKard({
  groupMember,
  setGroupMember,
  info,
  roleId,
  owner
}: {
  groupMember: GroupInfoDTO;
  setGroupMember: React.Dispatch<React.SetStateAction<GroupInfoDTO>>;
  info: MemberDTO;
  roleId: Number;
  owner: boolean;
}) {
  const [role, setRole] = useState("Owner");
  const [tag, setTag] = useState("gold");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const redirectProfile = () => {
    console.log("Hello");
    navigate(`/group/profile/${info.id}`);
  };

  const setRoleMember = () => {
    const updateReq: ModifyGroupDTO = {
      id: groupMember.id,
      role: roleId,
      memberId: info.id
    };
    setLoading(true);
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/group/member/`,
      data: updateReq
    })
      .then((response) => {
        if (response.status === 200) {
          if (roleId === 1) {
            removeItem(groupMember.coowner, info);
            groupMember.member.push(info);
          } else {
            removeItem(groupMember.member, info);
            groupMember.coowner.push(info);
          }
          toast.success("User's role has been changed.", {
            className: "toast_container"
          });
          setGroupMember(response.data);
        } else {
          toast(`${response}`, {
            className: "toast_container"
          });
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  };

  const kick = () => {
    const kickReq: ModifyGroupDTO = {
      id: groupMember.id,
      role: roleId,
      memberId: info.id
    };
    setLoading(true);
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/group/member/`,
      data: kickReq
    })
      .then((response) => {
        if (response.status === 200) {
          if (roleId === 1) removeItem(groupMember.coowner, info);
          else removeItem(groupMember.member, info);
          toast.success("User has been deleted.", {
            className: "toast_container"
          });
          setGroupMember(response.data);
        } else {
          toast(`${response}`, {
            className: "toast_container"
          });
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (roleId === 1) {
      setRole("Co-owner");
      setTag("teal");
    } else if (roleId === 0) {
      setRole("Member");
      setTag("gray");
    }
  }, [roleId]);

  return (
    <Card className="user-kard">
      {loading && <Spinner animation="border" />}
      <div className="kard-body">
        <img
          src="/assets/avatar_alt.svg"
          style={{ width: 48, height: 48, margin: "0 auto 16px auto" }}
          alt="avatar"
        />
        <header className="kard-center">{info.fullname}</header>
        <span className={`tag tag-${tag}`} style={{ margin: "4px auto" }}>
          {role}
        </span>
      </div>
      {owner && role !== "Owner" && (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header />
            <Accordion.Body>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={redirectProfile}>
                  Info
                </Button>
                {owner && role !== "Owner" && (
                  <Button variant="outline-dark" onClick={setRoleMember}>
                    Set to {role === "Member" ? "Co-owner" : "Member"}
                  </Button>
                )}
                {owner && role !== "Owner" && (
                  <Button variant="danger" onClick={kick}>
                    Kick
                  </Button>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {(!owner || (owner && role === "Owner")) && (
        <div className="d-grid" style={{ margin: "0 16px 16px" }}>
          <Button variant="primary" onClick={redirectProfile}>
            Info
          </Button>
        </div>
      )}
    </Card>
  );
}

export default UserKard;
