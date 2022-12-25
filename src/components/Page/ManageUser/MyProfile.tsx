/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner
} from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationTriangle } from "react-icons/fa";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "../../Common/Toast/ToastStyle.css";

export default function MyProfile() {
  const [user, setUser] = useState({
    email: "",
    date: "",
    fullname: ""
  });
  const formAuthSchema = Yup.object().shape({
    updatedName: Yup.string().required("New name is required")
  });
  const passFormAuthSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Current Password is required"),
    updatedPassword: Yup.string().required("New Password is required")
  });
  const formOptions = { resolver: yupResolver(formAuthSchema) };
  const passFormOptions = { resolver: yupResolver(passFormAuthSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errors2 }
  } = useForm(passFormOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const localId = localStorage.getItem("id");

  function setData() {
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/get/${localId}`
    })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  function onSubmit(data: any) {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }

  function OnChangePass(data: any) {
    setLoading(true);
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/user/updatepassword`,
      data: {
        email: user.email,
        oldPassword: data.oldPassword,
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
      })
      .finally(() => setLoading(false));
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
        height: "500px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {loading && (
        <div
          style={{
            backgroundColor: "black",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "0.6",
            borderRadius: "10px"
          }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <Container
        style={{
          marginTop: "20px",
          background: "white",
          width: "800px",
          height: "450px",
          borderRadius: "32px"
        }}
      >
        <Row>
          <Col xs={4}>
            <img src="/assets/profilePicture.svg" />
          </Col>
          <Col style={{ marginLeft: "10px" }}>
            <Row
              style={{
                marginTop: "50px",
                fontWeight: "bold",
                fontSize: "22px"
              }}
            >
              {user.email}
            </Row>
            <Row style={{ fontWeight: "bold" }}>Created At: {user.date}</Row>
            <Row style={{ fontWeight: "bold" }}>Fullname: {user.fullname}</Row>
            <Card style={{ marginTop: "10px", marginRight: "10px" }}>
              <Card.Header as="h5">Edit Info</Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Control
                        placeholder="Update name"
                        {...register("updatedName")}
                        style={{
                          width: "200px",
                          marginRight: "20px",
                          marginBottom: "5px"
                        }}
                      />
                      {errors.updatedName &&
                        errors.updatedName.type === "required" && (
                          <p className="error">
                            <FaExclamationTriangle className="mx-2" />
                            New fullname is required
                          </p>
                        )}
                      <Button type="submit">Change Fullname</Button>
                    </Form>
                  </Col>

                  <Col xs={6}>
                    <Form onSubmit={handleSubmitPass(OnChangePass)}>
                      <Form.Control
                        type="password"
                        placeholder="Old Password"
                        {...registerPass("oldPassword")}
                        style={{ width: "200px", marginBottom: "5px" }}
                      />
                      {errors2.oldPassword &&
                        errors2.oldPassword.type === "required" && (
                          <p className="error">
                            <FaExclamationTriangle className="mx-2" />
                            Current password is required
                          </p>
                        )}
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        {...registerPass("updatedPassword")}
                        style={{ width: "200px", marginBottom: "5px" }}
                      />
                      {errors2.updatedPassword &&
                        errors2.updatedPassword.type === "required" && (
                          <p className="error">
                            <FaExclamationTriangle className="mx-2" />
                            New password is required
                          </p>
                        )}
                      <Button type="submit">Change Password</Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {/* <Row>
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
            </Row> */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
