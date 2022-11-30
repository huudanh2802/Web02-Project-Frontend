import { Row, Col, Button, Image } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";
import MemberDTO from "../../../../dtos/MemberDTO";
import "./OwnerInfo.css";

export default function OwnerInfo({ owner }: { owner: MemberDTO }) {
  return (
    <Row className="owner">
      <Col lg={3}>
        <Image
          // eslint-disable-next-line react/style-prop-object
          className="ava"
          fluid
          src="/assets/profileAvatar.png"
        />
      </Col>
      <Col lg={3} className="owner-row">
        <p className="text">{owner.email}</p>
      </Col>
      <Col lg={3} className="owner-row">
        <Button type="button" className="iconBtn">
          <FaInfo className="icon" />
        </Button>
      </Col>
    </Row>
  );
}
