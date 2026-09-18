import type { Message } from "../types";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }: Message[]) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}