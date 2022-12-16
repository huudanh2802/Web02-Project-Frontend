export interface AnswerDTO {
  id: string;
  answer: string;
  placeHolder: string;
}

export interface SlideDTO {
  idx: number;
  question: string;
  correct: string;
  answers: AnswerDTO[];
}

export type SlideDTOV2 = {
  idx: number;
};

export type MutipleChoiceDTO = SlideDTOV2 & {
  type: 1;

  question: string;
  correct: string;
  answers: AnswerDTO[];
};

export type HeadingDTO = SlideDTOV2 & {
  type: 2;
  heading: string;
};

export type ParagraphDTO = SlideDTOV2 & {
  type: 3;
  heading: string;
  paragraph: string;
};

export type Slide = MutipleChoiceDTO | HeadingDTO | ParagraphDTO;

export default interface PresentationDTO {
  name: string;
  groupId: string;
  slides: SlideDTO[];
}
export interface PresentationDTOV2 {
  name: string;
  creator: string;
  slides: Slide[];
}
