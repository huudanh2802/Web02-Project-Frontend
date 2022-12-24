import React from "react";
import { Button } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

import "../../Realtime.css";

function ResultFAB({
  handleShowResult,
  newResultCount
}: {
  handleShowResult: () => void;
  newResultCount: number;
}) {
  return (
    <>
      <Button
        className="fab fab-result"
        variant="dark"
        onClick={handleShowResult}
      >
        <FaCheck className="mb-2" />
      </Button>
      {newResultCount > 0 && (
        <span className="fab-noti fab-result-noti">
          {newResultCount <= 9 ? newResultCount : "9+"}
        </span>
      )}
    </>
  );
}

export default ResultFAB;
