/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
import Select from "react-select";

import MemberSelection from "../MemberSelection/MemberSelection";
import "./NewGroup.css";

import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import MemberRole from "../MemberRole/MemberRole";
// eslint-disable-next-line import/order
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Common/Toast/ToastStyle.css";

import MemberDTO from "../../../../dtos/MemberDTO";
import MemberSearchBox, {
  MemberOption
} from "../../../Common/MemberSearchBox/MemberSearchBox";
import MemberOptionDTO from "../../../../dtos/MemberOptionDTO";
import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";

function OwnerRole({ owner }: { owner: MemberDTO }) {
  const option = [{ value: 0, label: "Owner" }];
  return (
    <Row>
      <Col lg={2}>
        <FaUserCircle size={40} />
      </Col>
      <Col lg={4}>
        <p style={{ fontWeight: "bold", margin: "0" }}>{owner.email}</p>
        <p style={{ color: "#8ea1b0" }}>{owner.fullname}</p>
      </Col>
      <Col lg={2}>
        <Select
          styles={{
            control: (baseStyles) => ({
              ...baseStyles
            })
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          options={option}
          value={{ value: 0, label: "Owner" }}
          isDisabled
        />
      </Col>
    </Row>
  );
}

export default function NewGroup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const localId = localStorage.getItem("id");
  const [owner, setOwner] = useState<MemberDTO>({
    id: "",
    email: "",
    fullname: ""
  });
  function getOwner() {
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/get/${localId}`
    })
      .then((response) => {
        setOwner(response.data);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<NewGroupDTO>();
  const [memberSearch, setMemberSearch] = useState<MemberOption[]>([]);
  const [memberSelection, setMemberSelection] = useState<MemberRoleDTO[]>([]);

  const [newGroup, setNewGroup] = useState<NewGroupDTO>({
    name: "",
    owner: {
      id: localId!,
      fullname: owner.fullname,
      email: owner.email
    },
    coowner: [],
    member: []
  });

  function getMemberSearch() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/user/getMemberSearch/${localId}`
    })
      .then((response) => {
        const { data } = response;
        const memberOption: MemberOption[] = data.map((d: MemberOptionDTO) => ({
          value: d,
          label: d.email,
          disabled: false
        }));
        setMemberSearch(memberOption);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  function sendData() {
    setLoading(true);
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/newgroup`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },

      data: newGroup
    })
      .then((response) => {
        navigate(`/group/detail/${response.data}`);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  const onSubmit = handleSubmit((data) => {
    try {
      newGroup.name = data.name;
      sendData();
    } catch (e) {
      console.log(e);
    }
  });

  function addMember(member: MemberOption) {
    setMemberSelection([
      ...memberSelection,
      {
        id: member.value.id,
        email: member.value.email,
        fullname: member.value.fullname
      }
    ]);
    const disabledIdx = memberSearch.findIndex((m) => m.value === member.value);
    memberSearch[disabledIdx].disabled = true;
    newGroup.member.push({
      id: member.value.id,
      email: member.value.email,
      fullname: member.value.fullname
    });
    setNewGroup(newGroup);
    setMemberSearch(memberSearch);
  }
  function removeMember(memberData: MemberRoleDTO) {
    newGroup.coowner = newGroup.coowner.filter((m) => m.id !== memberData.id);
    newGroup.member = newGroup.member.filter((m) => m.id !== memberData.id);
    setMemberSelection((current) =>
      current.filter((m) => m.id !== memberData.id)
    );
    const disabledIdx = memberSearch.findIndex(
      (m) => m.value.id === memberData.id
    );
    memberSearch[disabledIdx].disabled = false;
    setMemberSearch(memberSearch);
    setNewGroup(newGroup);
  }

  useEffect(() => {
    getOwner();
    setValue("owner", owner);
    getMemberSearch();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container className="mt-3">
        <Row className="m-4">
          <Col>
            <Row className="m-3">
              <InputGroup>
                <Form.Control
                  placeholder="Group Name"
                  aria-label="GroupName"
                  aria-describedby="basic-addon1"
                  className="input-box"
                  {...register("name", {
                    required: "This field is required"
                  })}
                />
              </InputGroup>
              {errors.name && (
                <span style={{ color: "#bf1650" }}>
                  {" "}
                  ⚠ This field is required
                </span>
              )}
            </Row>

            <Row className="m-3">
              <h2 className="title">Owner</h2>
              <OwnerRole owner={owner} />
            </Row>
            <Row className="m-3">
              <h2 className="title">Set Roles</h2>
              <MemberSearchBox
                member={memberSearch}
                addMember={(m) => addMember(m)}
              />
              <MemberSelection
                newGroup={newGroup}
                setNewGroup={setNewGroup}
                memberSelection={memberSelection}
                removeMember={(e) => removeMember(e)}
              />
            </Row>
            <Row className="m-4 ">
              <Col lg={12} className="d-flex justify-content-center">
                <Button type="submit" className="createBtn" variant="primary">
                  Create
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </form>
  );
}
