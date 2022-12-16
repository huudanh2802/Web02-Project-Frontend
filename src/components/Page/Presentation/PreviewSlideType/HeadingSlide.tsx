import { Card } from "react-bootstrap";
import { HeadingDTO } from "../../../../dtos/PresentationDTO";

export default function HeadingSlide({
  currentSlide
}: {
  currentSlide: HeadingDTO;
}) {
  return (
    <Card>
      <Card.Body
        style={{ fontSize: "30px", margin: "8px", textAlign: "center" }}
      >
        {currentSlide.heading ? currentSlide.heading : "Heading"}
      </Card.Body>
    </Card>
  );
}
