// components/ConversationHeader.tsx
import type { Conversation } from "../types";

type ConversationHeaderProps = {
  conversation: Conversation;
};

export function ConversationHeader({ conversation }: ConversationHeaderProps) {
  return (
    <header className="conversation-header">
      <span className="conversation-header__name">{conversation.name}</span>
      <span
        className={
          conversation.isOnline
            ? "status-dot status-dot--online"
            : "status-dot status-dot--offline"
        }
      >
        {conversation.isOnline ? "Online" : "Offline"}
      </span>
    </header>
  );
}