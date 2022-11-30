/* eslint-disable */
import { Row, Col, Card, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import GroupDTO from "../../../../dtos/GroupDTO";
import ListGroup from "../ListGroup/ListGroup";
import "./Group.css"
import axios from "axios";
function Group() {
  const [selected, setSelected] = useState("");
  const [ownGroup,setOwnGroup] = useState<GroupDTO[]>([]);
  const [memberGroup,setMemberGroup] = useState<GroupDTO[]>([]);

  function getOwnGroup(){
    const localId = localStorage.getItem("id");

    axios
      .get(`http://localhost:8081/group/owngroup/${localId}`)
      .then((response) => {
        setOwnGroup(response.data);
      })
      .catch((err: any) => {
        console.log(err.response.data.error);
      });

    // axios({
    //   method: "get",
    //   url: `http://localhost:8081/group/owngroup/${localId}`
    // }).then((response) => {
    //   setOwnGroup(response.data);
    // });
  }
  function getMemberGroup(){
    const localId = localStorage.getItem("id");

    axios({
      method: "get",
      url: `http://localhost:8081/group/membergroup/${localId}`
    }).then((response) => {
      setMemberGroup(response.data);
    });
  }

  useEffect(()=>{
    getOwnGroup();
    getMemberGroup();
  },[])


  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <>
      {/* <Container
        className="container-form"
      >
        <Form>
          <Form.Control type="input" placeholder="Search for group... " />
        </Form>
        <select value={selected} onChange={handleChange}>
          <option value="">---Sort by---</option>
          <option value="name">Group Name</option>
          <option value="date">Date</option>
        </select>
      </Container> */}

      <Container className="container-group">
        <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>Created</h5>
        <Row>
          {ownGroup.map((group, index) => {
            return (
              <>
                <ListGroup group={group} index={index}></ListGroup>
              </>
            );
          })}
        </Row>
      </Container>

      <Container className="container-group">
        <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>Joined</h5>
        <Row>
          {memberGroup.map((group, index) => {
            return (
              <>
              <ListGroup group={group} index={index}></ListGroup>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Group;
