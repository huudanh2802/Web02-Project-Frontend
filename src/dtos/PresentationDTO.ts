export interface AnswerDTO {
  id: string;
  answer: string;
  placeHolder: string;
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

export interface PresentationDTOV2 {
  name: string;
  creator: string;
  slides: Slide[];
}
