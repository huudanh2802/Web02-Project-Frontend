/* eslint-disable react/react-in-jsx-scope */
import { Container, Row, Col, Card } from "react-bootstrap";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Confirm() {
  const { token } = useParams();
  function confirmToken() {
    axios({
      method: "get",
      url: `http://localhost:8081/user/verify/${token}`
    }).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
  }
  useEffect(() => {
    confirmToken();
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
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
