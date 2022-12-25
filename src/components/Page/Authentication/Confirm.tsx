/* eslint-disable react/react-in-jsx-scope */
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosPublic from "../../../token/axiosPublic";
import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";

export default function Confirm() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  function confirmToken() {
    setLoading(true);
    axiosPublic
      .get(`/user/verify/${token}`)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    confirmToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
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
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Your Email has been confirmed
                </h2>
                <div className="mt-2" style={{ textAlign: "center" }}>
                  <p>
                    Click this
                    <span>
                      <Link to="/">&nbsp;Link&nbsp;</Link>
                    </span>
                    to went back to login page
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
