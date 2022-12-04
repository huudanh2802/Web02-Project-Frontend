import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import UserKard from "../../../Common/Kard/UserKard";
import InviteModal from "./InviteModal";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";

function MemberTab({
  groupId,
  groupMember,
  setGroupMember,
  owner
}: {
  groupId: string | undefined;
  groupMember: GroupInfoDTO;
  setGroupMember: React.Dispatch<React.SetStateAction<GroupInfoDTO>>;
  owner: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPlus style={{ marginRight: "8px" }} /> Invite
      </Button>
      <InviteModal
        showModal={showModal}
        handleClose={handleClose}
        groupId={groupId}
        groupMember={groupMember}
      />
      <Row xs={1} md={3} lg={6} style={{ marginTop: "16px" }}>
        <Col>
          <UserKard
            groupMember={groupMember}
            setGroupMember={setGroupMember}
            info={groupMember.owner}
            roleId={2}
            owner={owner}
          />
        </Col>
        {groupMember.coowner.length > 0 && (
          <>
            {groupMember.coowner.map((member) => (
              <Col>
                <UserKard
                  groupMember={groupMember}
                  setGroupMember={setGroupMember}
                  info={member}
                  roleId={1}
                  owner={owner}
                />
              </Col>
            ))}
          </>
        )}
        {groupMember.member.length > 0 && (
          <>
            {groupMember.member.map((member) => (
              <Col>
                <UserKard
                  groupMember={groupMember}
                  setGroupMember={setGroupMember}
                  info={member}
                  roleId={0}
                  owner={owner}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
}

export default MemberTab;
