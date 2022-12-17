/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { Col, Button, Form, InputGroup } from "react-bootstrap";
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues
} from "react-hook-form";
import {
  MutipleChoiceDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../dtos/PresentationDTO";
import { nextChar } from "../../../../helpers/functions";
import EditMutipleChoice from "../EditSlideType/EditMutipleChoice";
import EditHeading from "../EditSlideType/EditHeading";
import EditParagraph from "../EditSlideType/EditParagraph";

function SlideEdit({
  currentSlide,
  detailPresentation,
  setCurrentSlide,
  setPresentation
}: {
  currentSlide: SlideDTO;
  detailPresentation: PresentationDTO;
  setCurrentSlide: (event: any) => void;
  setPresentation: (value: React.SetStateAction<PresentationDTO>) => void;
}) {
  const setCurrentSlideType = () => {
    switch (currentSlide.type) {
      case 1: {
        return (
          <EditMutipleChoice
            currentSlide={currentSlide}
            detailPresentation={detailPresentation}
            setCurrentSlide={setCurrentSlide}
            setPresentation={setPresentation}
          />
        );
      }
      case 2: {
        return (
          <EditHeading
            currentSlide={currentSlide}
            detailPresentation={detailPresentation}
            setCurrentSlide={setCurrentSlide}
            setPresentation={setPresentation}
          />
        );
      }
      case 3: {
        return (
          <EditParagraph
            currentSlide={currentSlide}
            detailPresentation={detailPresentation}
            setCurrentSlide={setCurrentSlide}
            setPresentation={setPresentation}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return <>{setCurrentSlideType()}</>;
}

export default SlideEdit;
