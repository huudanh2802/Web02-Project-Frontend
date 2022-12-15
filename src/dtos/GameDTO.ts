export interface ChatDTO {
  username: string;
  chat: string;
  createdAt: Date;
}

export interface GameDTO {
  game: string;
  groupId: string;
  chat: ChatDTO[];
  ended: boolean;
  createdAt: Date;
}
