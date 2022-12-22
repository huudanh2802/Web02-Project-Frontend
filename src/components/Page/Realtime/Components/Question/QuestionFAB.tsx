import React from "react";
import { Button } from "react-bootstrap";
import { FaQuestionCircle } from "react-icons/fa";

import "../../Realtime.css";

function QuestionFAB({
  handleShowQuestion,
  newQuestionCount
}: {
  handleShowQuestion: () => void;
  newQuestionCount: number;
}) {
  return (
    <>
      <Button
        className="fab fab-question"
        variant="dark"
        onClick={handleShowQuestion}
      >
        <FaQuestionCircle className="mb-2" />
      </Button>
      {newQuestionCount > 0 && (
        <span className="fab-noti fab-question-noti">
          {newQuestionCount <= 9 ? newQuestionCount : "9+"}
        </span>
      )}
    </>
  );
}

export default QuestionFAB;
