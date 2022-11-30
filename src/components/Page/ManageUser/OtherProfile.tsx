/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosPrivate } from "../../../token/axiosPrivate";

export default function OtherProfile() {
  const [user, setUser] = useState({
    email: "",
    date: "",
    fullname: ""
  });
  const { id } = useParams();

  function setData() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/get/${id}`
    }).then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      style={{
        background: "#318F9B",
        width: "1100px",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Container
        style={{
          background: "white",
          width: "800px",
          height: "227px",
          borderRadius: "32px"
        }}
      >
        <Row>
          <Col xs={4}>
            <img src="/assets/profilePicture.svg" />
          </Col>
          <Col>
            <Row style={{ marginTop: "50px" }}>
              <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                {user.email}
              </span>
            </Row>
            <Row>
              <span>Created At: {user.date}</span>
            </Row>
            <Row>
              <span>Fullname: {user.fullname}</span>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}