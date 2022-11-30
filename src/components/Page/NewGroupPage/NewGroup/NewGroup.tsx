/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Form, InputGroup, Button, Container } from "react-bootstrap";
import { useEffect, useState, createContext } from "react";
import { useForm } from "react-hook-form";

// import {Image} from "react-bootstrap";
import MemberSelection from "../MemberSelection/MemberSelection";
import "./NewGroup.css";

import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import MemberRole from "../MemberRole/MemberRole";
import { axiosPrivate } from "../../../../token/axiosPrivate";

// const defaultImgPath = "assets/group1.png";

export default function NewGroup() {
  const localData = {
    id: localStorage.getItem("id")!,
    email: localStorage.getItem("email")!
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<NewGroupDTO>();

  const [newGroup, setNewGroup] = useState<NewGroupDTO>({
    name: "",
    owner: localData,
    coowner: [],
    member: []
  });

  function sendData() {
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/newgroup`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },

      data: newGroup
    }).then((response) => {
      console.log(response);
    });
  }

  const onSubmit = handleSubmit((data) => {
    newGroup.name = data.name;
    newGroup.owner = data.owner;
    console.log(newGroup);
    sendData();
  });

  useEffect(() => {
    setValue("owner", localData);
  }, [localData, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Container className="mt-3">
        <Row className="m-4">
          {/* <Col lg={4}>
          <Form.Group controlId="formFile" className="mb-3 ">
            <Image src={defaultImgPath} fluid className="mb-3 image-box " />
            <Form.Control type="file" />
          </Form.Group>
        </Col> */}
          <Col>
            <Row className="m-3">
              <h2 className="title">Group Name</h2>
              <InputGroup>
                <Form.Control
                  placeholder="Group Name"
                  aria-label="GroupName"
                  aria-describedby="basic-addon1"
                  className="input-box"
                  {...register("name")}
                />
              </InputGroup>
            </Row>
            <Row className="m-3">
              <h2 className="title">Owner</h2>
              <MemberRole
                memberData={localData}
                add={false}
                newGroup={null}
                setNewGroup={null}
              />
            </Row>
            <Row className="m-3">
              <h2 className="title">Set Roles</h2>
              <MemberSelection newGroup={newGroup} setNewGroup={setNewGroup} />
            </Row>
            <Row className="m-4 ">
              <Col lg={6} className="d-flex justify-content-center">
                <Button type="submit" className="createBtn" variant="primary">
                  Create
                </Button>
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <Button type="button" className="cancelBtn" variant="primary">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </form>
  );
}
