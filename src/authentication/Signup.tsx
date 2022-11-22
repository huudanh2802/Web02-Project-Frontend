/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaExclamationTriangle } from "react-icons/fa";
import "../index.css";
import background from "../bg-2.jpg";
import "./FormStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

type FormOneInputs = {
  email: string;
  password: string;
  confirm: string;
};

type FormTwoInputs = {
  fullname: string;
  dob: string;
  gender: number;
  type: number;
};

function Signup() {
  // Sign-up forms
  const [form, setForm] = useState(0);
  const updateForm = useCallback(() => setForm(1), []);
  const returnForm = useCallback(() => setForm(0), []);

  // Data
  const [data, setData] = useState({
    authen: {
      email: "",
      password: ""
    },
    info: {
      fullname: "",
      dob: "",
      gender: 0,
      type: 0
    }
  });

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormOneInputs>();
  const onSubmit: SubmitHandler<FormOneInputs> = (authenData) => {
    console.log(authenData);
    setData({
      authen: {
        email: authenData.email,
        password: authenData.password
      },
      info: {
        fullname: "",
        dob: "",
        gender: 0,
        type: 0
      }
    });
    updateForm();
  };

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo }
  } = useForm<FormTwoInputs>();
  const onSubmitInfo: SubmitHandler<FormTwoInputs> = (infoData) => {
    console.log(infoData);
    setData({
      authen: data.authen,
      info: {
        fullname: infoData.fullname,
        dob: infoData.dob,
        gender: infoData.gender,
        type: infoData.type
      }
    });
    console.log(data);
  };

  // Background style
  const bgStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  if (form === 0)
    // First form: Email & password
    return (
      <Container fluid style={bgStyle}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12} />
          <Col md={6} lg={4} xs={8}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4 mx-4">
                  <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                    Sign Up
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          {...register("email", { required: true })}
                        />
                      </Form.Group>
                      {errors.email && (
                        <p className="error">
                          <FaExclamationTriangle className="mx-2" />
                          This field is required
                        </p>
                      )}

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          {...register("password", {
                            required: true,
                            minLength: 8
                          })}
                        />
                      </Form.Group>
                      {errors.password && (
                        <p className="error">
                          <FaExclamationTriangle className="mx-2" />
                          Password is required
                        </p>
                      )}

                      <Form.Group
                        className="mb-3"
                        controlId="formConfirmPassword"
                      >
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          {...register("confirm", { required: true })}
                        />
                      </Form.Group>
                      {errors.confirm && (
                        <p className="error">
                          <FaExclamationTriangle className="mx-2" />
                          This field is required
                        </p>
                      )}

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Continue
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Login
                        </a>
                      </p>
                    </div>
                    <hr />
                    <div className="d-grid mt-3">
                      <Button variant="outline-dark">
                        <FaGoogle /> Continue with Google
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );

  // Second form: Account information
  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Account Information
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmitInfo(onSubmitInfo)}>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Your name
                      </Form.Label>
                      <Form.Control
                        type="fullname"
                        placeholder="Your name"
                        {...registerInfo("fullname", { required: true })}
                      />
                    </Form.Group>
                    {errorsInfo.fullname && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        This field is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formDob">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Select Date of Birth"
                        {...registerInfo("dob", { required: true })}
                      />
                    </Form.Group>
                    {errorsInfo.dob && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        This field is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formGender">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Gender
                      </Form.Label>
                      <Form.Select
                        {...registerInfo("gender", { required: true })}
                      >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Other</option>
                      </Form.Select>
                    </Form.Group>
                    {errorsInfo.gender && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        This field is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formType">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Account type
                      </Form.Label>
                      <Form.Select
                        {...registerInfo("type", { required: true })}
                      >
                        <option value="0">Student</option>
                        <option value="1">Teacher</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-grid mt-4">
                      <Button variant="primary" type="submit">
                        Sign up
                      </Button>
                    </div>

                    <div className="d-grid mt-3">
                      <Button variant="outline-dark" onClick={returnForm}>
                        Back
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
