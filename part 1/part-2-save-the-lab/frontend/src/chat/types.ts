export type MessageStatus = "sending" | "sent" | "failed";

export type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  status: MessageStatus;
  timestamp: number;
};

export type Conversation = {
  id: string;
  name: string;
  isOnline: boolean;
  messages: Message[];
};