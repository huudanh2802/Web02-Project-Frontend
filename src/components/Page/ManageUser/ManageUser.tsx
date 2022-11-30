/* eslint-disable*/
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosPrivate } from "../../../token/axiosPrivate";

export function ManageUser() {
  const [user, setUser] = useState({
    email: "",
    date: ""
  });

  function setData() {
    const localId = localStorage.getItem("id");
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/get/638398bb2797c4a83dc2bb04`
    }).then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
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
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
