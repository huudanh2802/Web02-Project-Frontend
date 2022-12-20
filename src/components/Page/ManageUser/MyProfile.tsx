/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "../../Common/Toast/ToastStyle.css";

export default function MyProfile() {
  const [user, setUser] = useState({
    email: "",
    date: "",
    fullname: ""
  });

  const { register, handleSubmit } = useForm();
  const localId = localStorage.getItem("id");

  function setData() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/get/${localId}`
    })
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }

  function onSubmit(data: any) {
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/user/update`,
      data: {
        id: localId,
        updatedName: data.updatedName
      }
    })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        toast.success("Name has been updated", {
          className: "toast_container"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }

  function OnChangePass(data: any) {
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/user/updatepassword`,
      data: {
        id: localId,
        newPassword: data.updatedPassword
      }
    })
      .then(() => {
        toast.success("Password has been updated", {
          className: "toast_container"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
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
            <Row>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  placeholder="Update name"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("updatedName")}
                  style={{ width: "200px", marginRight: "20px" }}
                />
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </form>
            </Row>
            <Row>
              <Form onSubmit={handleSubmit(OnChangePass)}>
                <input
                  placeholder="Update password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register("updatedPassword")}
                  style={{ width: "200px", marginRight: "20px" }}
                />
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
