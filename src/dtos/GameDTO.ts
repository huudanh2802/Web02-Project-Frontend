export interface ChatItemDTO {
  username: string;
  chat: string;
  createdAt: Date;
  own: boolean;
  role: number;
}

export interface QuestionItemDTO {
  username: string;
  question: string;
  createdAt: Date;
  own: boolean;
  role: number;
  answered: boolean;
  vote: number;
}

export interface AnswerCounterDTO {
  id: string;
  count: number;
}
