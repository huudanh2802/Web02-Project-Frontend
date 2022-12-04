import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import UserKard from "../../../Common/Kard/UserKard";
import InviteModal from "./InviteModal";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import InviteDTO from "../../../../dtos/InviteDTO";

function MemberTab({
  groupMember,
  setGroupMember,
  owner,
  inviteDTO
}: {
  groupMember: GroupInfoDTO;
  setGroupMember: React.Dispatch<React.SetStateAction<GroupInfoDTO>>;
  owner: boolean;
  inviteDTO: InviteDTO;
}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Invite
      </Button>
      <InviteModal
        inviteDTO={inviteDTO}
        showModal={showModal}
        handleClose={handleClose}
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
