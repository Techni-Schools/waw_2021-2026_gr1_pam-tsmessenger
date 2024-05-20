export type User = {
  _id: string;
  username: string;
  email?: string;
  password?: string;
  photo?: string;
};

export type Participant = {
  _id: string;
  role: "owner" | "member";
  user: string | User;
};

export type Conversation = {
  _id: string;
  name: string;
  participants: Participant[];
  accentColor?: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  conversation: string | Conversation;
  user: string | User;
  content: string;
  createdAt: string;
  updatedAt: string;
};
