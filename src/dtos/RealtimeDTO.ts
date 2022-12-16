export interface ChatDTO {
  username: string;
  chat: string;
  createdAt: Date;
}

export interface ChatItemDTO {
  username: string;
  chat: string;
  createdAt: Date;
  own: boolean;
  role: number;
}
