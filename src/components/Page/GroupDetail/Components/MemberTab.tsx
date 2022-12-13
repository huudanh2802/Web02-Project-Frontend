import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import UserKard from "../../../Common/Kard/UserKard";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";

function MembersTab({
  groupMember,
  setGroupMember,
  owner,
  handleShow
}: {
  groupMember: GroupInfoDTO;
  setGroupMember: React.Dispatch<React.SetStateAction<GroupInfoDTO>>;
  owner: boolean;
  handleShow: () => void;
}) {
  return (
    <>
      <Button onClick={handleShow}>Invite</Button>
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

export default MembersTab;
