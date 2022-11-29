/* eslint-disable jsx-a11y/alt-text */
import { Col, Container, Row, Form, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function GroupInfo() {
  const { name } = useParams();
  return (
    <Container
      style={{
        maxWidth: "700px",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2 style={{ color: "#389CB2", marginBottom: "1rem" }}>Group Info</h2>
      <Card>
        <Row>
          <Row>
            <Col>
              <img src="/assets/group1.png" width={150} height={150} />
            </Col>
            <Col>
              <Row>
                <h5
                  style={{
                    color: "#389CB2",
                    fontWeight: "bold",
                    margin: "8px 0 8px 0"
                  }}
                >
                  Group Name
                </h5>
              </Row>
              <Form.Control placeholder={name} />
              <Row>
                <h5
                  style={{
                    color: "#389CB2",
                    fontWeight: "bold",
                    margin: "8px 0 8px 0"
                  }}
                >
                  Members
                </h5>
              </Row>
              <Row>
                <Col>
                  <Button size="sm" variant="outline-success">
                    Add Member
                  </Button>
                </Col>
                <Col>
                  <Button size="sm" variant="outline-danger">
                    Kick
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </Card>
    </Container>
  );
}
