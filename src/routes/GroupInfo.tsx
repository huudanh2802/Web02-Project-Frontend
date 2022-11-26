/* eslint-disable */
import Menu from "../components/Menu/Menu";
import Group from "../components/Group/Group";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
export function GroupInfo() {
    const {id} = useParams()
  return (
    <>
      <Menu />
      <Container
        style={{
          maxWidth: "700px",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column"
        }}>
        <Row>
            <h3 style={{color: "#389CB2"}}>Group Info</h3>
            
        </Row>
      </Container>
    </>
  );
}
