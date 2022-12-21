import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import "../../../index.css";
import { FieldValues, useForm } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";
import axiosPublic from "../../../token/axiosPublic";

function ForgotPassword() {
  const formAuthSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
  });
  const formOptions = { resolver: yupResolver(formAuthSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    axiosPublic
      .post(`/user/forget`, {
        email: data.email,
        password: data.password
      })
      .then(() => {
        toast.success(
          "Check your registered email to receive the new password",
          {
            className: "toast_container"
          }
        );
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Forgot Password
                </h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Enter your registered email to receive a new password:
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register("email")}
                    />
                  </Form.Group>
                  {errors.email && errors.email.type === "required" && (
                    <p className="error">
                      <FaExclamationTriangle className="mx-2" />
                      Email account is required
                    </p>
                  )}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
