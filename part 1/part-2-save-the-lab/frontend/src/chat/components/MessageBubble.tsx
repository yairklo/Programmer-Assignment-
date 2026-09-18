import type { Message } from "../types";

export function MessageBubble({ message }: Message) {
  return (
    <div
      className={
        message.sender === "me"
          ? "message-bubble message-bubble--me"
          : "message-bubble message-bubble--them"
      }
    >
      <p className="message-bubble__text">{message.text}</p>
      {message.sender === "me" && (
        <span className={`message-bubble__status message-bubble__status--${message.status}`}>
          {message.status}
        </span>
      )}
    </div>
  );
}