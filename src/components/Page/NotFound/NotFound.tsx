import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <img src="/assets/404.png" alt="" width={600} height={500} />
      <h1 style={{ textAlign: "center" }}>404 NOT FOUND</h1>
      <p style={{ textAlign: "center" }}>This page does not exist</p>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  );
}

export default NotFound;
