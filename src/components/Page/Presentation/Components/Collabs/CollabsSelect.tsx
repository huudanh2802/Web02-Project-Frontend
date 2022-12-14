/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../Common/Toast/ToastStyle.css";
import MemberOptionDTO from "../../../../../dtos/MemberOptionDTO";
import { axiosPrivate } from "../../../../../token/axiosPrivate";
import MemberSearchBox, {
  MemberOption
} from "../../../../Common/MemberSearchBox/MemberSearchBox";

function CollabsMember({
  member,
  removeMember
}: {
  member: MemberOptionDTO;
  removeMember: (event: any) => void;
}) {
  return (
    <Row>
      <Col lg={2}>
        <FaUserCircle size={30} />
      </Col>
      <Col lg={7}>
        <p style={{ fontWeight: "bold", margin: "0" }}>{member.email}</p>
        <p style={{ color: "#8ea1b0" }}>{member.fullname}</p>
      </Col>
      <Col>
        <Button variant="danger" onClick={() => removeMember(member)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
}

export default function CollabsSelect({
  handleCloseCollabs
}: {
  handleCloseCollabs: (event: any) => void;
}) {
  const localId = localStorage.getItem("id");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [listCollabs, setListCollabs] = useState<MemberOptionDTO[]>([]);
  const [memberSearch, setMemberSearch] = useState<MemberOption[]>([]);

  function getMemberSearch(collabs: MemberOptionDTO[]) {
    setLoading(true);
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
        collabs.forEach((c) => {
          const memberId = memberOption.findIndex((m) => m.value.id === c.id);
          memberOption[memberId].disabled = true;
        });
        setMemberSearch(memberOption);
      })
      .finally(() => setLoading(false));
  }

  function getListCollabs() {
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/getCollabs/${id}`
    })
      .then((response) => {
        setListCollabs(response.data);
        getMemberSearch(response.data);
      })
      .finally(() => setLoading(false));
  }

  function removeMember(member: MemberOptionDTO) {
    setListCollabs((current) => current.filter((m) => m.id !== member.id));
    const disabledIdx = memberSearch.findIndex((m) => m.value.id === member.id);
    memberSearch[disabledIdx].disabled = false;
    setMemberSearch(memberSearch);
  }
  useEffect(() => {
    getListCollabs();
  }, []);

  function addMember(member: MemberOption) {
    setListCollabs([...listCollabs, member.value]);
    const disabledIdx = memberSearch.findIndex((m) => m.value === member.value);
    memberSearch[disabledIdx].disabled = true;
    setMemberSearch(memberSearch);
  }

  function updateCollabs() {
    setLoading(true);
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/updateCollabs/${id}`,
      data: listCollabs
    })
      .then((response) => {
        // alert("Collabs Updated");
        toast.success("Collabs Updated!", {
          className: "toast_container"
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  return (
    <>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <MemberSearchBox member={memberSearch} addMember={(m) => addMember(m)} />
      <ul>
        <li
          style={{
            display: "block",
            overflow: "auto",
            overflowX: "hidden",
            height: "200px"
          }}
        >
          {listCollabs.map((m) => (
            <CollabsMember member={m} removeMember={(e) => removeMember(e)} />
          ))}
        </li>
      </ul>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" onClick={() => updateCollabs()}>
          Update
        </Button>
        <Button variant="outline-dark" onClick={handleCloseCollabs}>
          Cancel
        </Button>
      </div>
    </>
  );
}
