import { Card, Row, Col } from "react-bootstrap";
import { MutipleChoiceDTO } from "../../../../dtos/PresentationDTO";

export default function MutipleChoiceSlide({
  currentSlide
}: {
  currentSlide: MutipleChoiceDTO;
}) {
  return (
    <>
      <Card>
        <Card.Body style={{ fontSize: "30px", margin: "8px" }}>
          {currentSlide.question ? currentSlide.question : "Question"}
        </Card.Body>
      </Card>
      <Row xs={1} md={2} className="g-4" style={{ marginTop: "8px" }}>
        {currentSlide.answers.map((answer) => (
          <Col>
            <Card
              className={
                currentSlide.correct === answer.id ? "correct-answer" : ""
              }
            >
              <Card.Body>
                <Card.Title>{answer.placeHolder}</Card.Title>
                <Card.Text>{answer.answer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
