import type { Conversation } from "./types";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    name: "Dana Cohen",
    isOnline: true,
    messages: [
      {
        id: "msg-1",
        text: "Hey, did you check the experiment results yet?",
        sender: "them",
        status: "sent",
        timestamp: Date.now() - 1000 * 60 * 60,
      },
      {
        id: "msg-2",
        text: "Not yet, looking now",
        sender: "me",
        status: "sent",
        timestamp: Date.now() - 1000 * 60 * 55,
      },
      {
        id: "msg-3",
        text: "Found something odd in batch 3",
        sender: "them",
        status: "sent",
        timestamp: Date.now() - 1000 * 60 * 30,
      },
    ],
  },
  {
    id: "conv-2",
    name: "Yossi Levy",
    isOnline: false,
    messages: [
      {
        id: "msg-4",
        text: "Meeting moved to 3pm",
        sender: "them",
        status: "sent",
        timestamp: Date.now() - 1000 * 60 * 60 * 5,
      },
    ],
  },
  {
    id: "conv-3",
    name: "Research Group",
    isOnline: true,
    messages: [],
  },
];