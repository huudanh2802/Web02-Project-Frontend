export interface ChatItemDTO {
  username: string;
  chat: string;
  createdAt: Date;
  own: boolean;
  role: number;
}

export interface QuestionItemDTO {
  idx: number;
  username: string;
  question: string;
  createdAt: Date;
  own: boolean;
  role: number;
  answered: boolean;
  voted: boolean;
  vote: number;
}

export interface ResultItemDTO {
  username: string;
  id: string;
  correct: boolean;
  createdAt: Date;
}

export interface QResultDTO {
  question: number;
  result: ResultItemDTO[];
}

export interface AnswerCounterDTO {
  id: string;
  count: number;
}

export default interface GameDTO {
  id: string;
  game: string;
  groupId: string | null;
  result: QResultDTO[];
  chat: ChatItemDTO[];
  question: QuestionItemDTO[];
  ended: boolean;
  createdAt: Date;
}
