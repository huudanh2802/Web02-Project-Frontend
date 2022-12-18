/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line no-unused-vars
import { useForm, FieldValues } from "react-hook-form";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axiosPublic from "../../../token/axiosPublic";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const formAuthSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
  });
  const formOptions = { resolver: yupResolver(formAuthSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    axiosPublic
      .post(`/user/forget`, {
        email: data.email,
        password: data.password
      })
      .then(() => {
        toast.success("Your password has been changed to 123456", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
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
    </>
  );
}

export default ForgotPassword;
