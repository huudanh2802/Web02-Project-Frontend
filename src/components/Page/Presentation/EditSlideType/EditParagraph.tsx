/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { UseFormRegister, UseFormHandleSubmit, useForm } from "react-hook-form";
import Select from "react-select";
import {
  PresentationDTOV2,
  ParagraphDTO
} from "../../../../dtos/PresentationDTO";
import { nextChar } from "../../../../helpers/functions";

export default function EditParagraph({
  currentSlide,
  detailPresentation,
  setCurrentSlide,
  setPresentation
}: {
  currentSlide: ParagraphDTO;
  detailPresentation: PresentationDTOV2;
  setCurrentSlide: (event: any) => void;
  setPresentation: (value: React.SetStateAction<PresentationDTOV2>) => void;
}) {
  const {
    register,
    handleSubmit: handleSlide,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: useMemo(() => currentSlide, [currentSlide])
  });
  const onSubmit = () => {
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = currentSlide;
    setPresentation(tempPresentation);
  };

  const setHeading = (event: any) => {
    setCurrentSlide((slide: any) => ({
      ...slide,
      heading: event.target.value
    }));
    const headingSlide = currentSlide;
    headingSlide.heading = event.target.value;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = headingSlide;
    setPresentation(tempPresentation);
  };

  const setParagraph = (event: any) => {
    setCurrentSlide((slide: any) => ({
      ...slide,
      paragraph: event.target.value
    }));
    const paragraphSlide = currentSlide;
    paragraphSlide.paragraph = event.target.value;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = paragraphSlide;
    setPresentation(tempPresentation);
  };

  function resetIdx() {
    const tempPresentation = detailPresentation;
    setPresentation(tempPresentation);
    for (let i = 0; i < detailPresentation.slides.length; i += 1) {
      tempPresentation.slides[i].idx = i;
    }

    setPresentation(tempPresentation);
  }

  function removeSlide(event: any) {
    if (currentSlide.idx === 0) {
      detailPresentation.slides.splice(0, 1);
      setPresentation(detailPresentation);
      resetIdx();
      setCurrentSlide(detailPresentation.slides[0]);
    } else {
      setCurrentSlide(detailPresentation.slides[currentSlide.idx - 1]);
      detailPresentation.slides.splice(currentSlide.idx, 1);
      setPresentation(detailPresentation);
      resetIdx();
    }
  }

  return (
    <Form id="slideEdit" onSubmit={handleSlide(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: "bold" }}>Heading</Form.Label>
        <Form.Control
          type="heading"
          placeholder={currentSlide.heading}
          {...register("heading")}
          onChange={setHeading}
        />
        <Form.Label style={{ fontWeight: "bold" }}>Paragraph</Form.Label>
        <Form.Control
          type="question"
          placeholder={currentSlide.paragraph}
          {...register("paragraph")}
          onChange={setParagraph}
        />
      </Form.Group>

      {detailPresentation.slides.length > 1 && (
        <>
          <Form.Label className="mt-3" style={{ fontWeight: "bold" }}>
            Slide options
          </Form.Label>
          <div className="d-grid">
            <Button
              className="mb-2"
              variant="danger"
              onClick={(e) => removeSlide(e)}
            >
              Remove slide
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
