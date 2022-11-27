/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useEffect, useState, createContext } from "react";
import { useForm } from "react-hook-form";

// import {Image} from "react-bootstrap";
import MemberSelection from "../Common/MemberSelection/MemberSelection";
import MemberRole from "../Common/MemberRole/MemberRole";
import "./NewGroup.css";

import NewGroupDTO from "../../dtos/NewGroupDTO";

// const defaultImgPath = "assets/group1.png";

export default function NewGroup() {
  const mockData = {
    id: "1231312",
    email: "huudanh2802"
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<NewGroupDTO>();

  const [newGroup, setNewGroup] = useState<NewGroupDTO>({
    name: "",
    owner: mockData,
    coowner: [],
    member: []
  });

  const onSubmit = handleSubmit((data) => console.log(newGroup));

  useEffect(() => {
    setValue("owner", mockData);
  }, [mockData, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-3 container">
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
                memberData={mockData}
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
      </div>
    </form>
  );
}
