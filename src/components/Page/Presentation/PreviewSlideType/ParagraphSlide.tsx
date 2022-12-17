import { Card } from "react-bootstrap";
import { ParagraphDTO } from "../../../../dtos/PresentationDTO";

export default function ParagraphSlide({
  currentSlide
}: {
  currentSlide: ParagraphDTO;
}) {
  return (
    <>
      <Card>
        <Card.Body
          style={{ fontSize: "30px", margin: "8px", textAlign: "center" }}
        >
          {currentSlide.heading ? currentSlide.heading : "Heading"}
        </Card.Body>
      </Card>
      <div className="g-4" style={{ marginTop: "8px" }}>
        <Card>
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title>
              {" "}
              {currentSlide.paragraph ? currentSlide.paragraph : "Paragraph"}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
