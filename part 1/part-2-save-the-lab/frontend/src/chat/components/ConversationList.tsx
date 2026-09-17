import type { Conversation } from "../types";

type ConversationListProps = {
  conversations: Conversation[];
  selectedConversationId: string;
  onSelect: (conversationId: string) => void;
};

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelect,
}: ConversationListProps) {
  return (
    <aside className="conversation-list">
      {conversations.map((conversation) => {
        const lastMessage = conversation.messages.at(-1);

        return (
          <button
            key={conversation.id}
            type="button"
            className={
              conversation.id === selectedConversationId
                ? "conversation-item conversation-item--active"
                : "conversation-item"
            }
            onClick={() => onSelect(conversation.id)}
          >
            <span className="conversation-item__name">{conversation.name}</span>
            <span className="conversation-item__preview">
              {lastMessage ? lastMessage.text : "No messages yet"}
            </span>
          </button>
        );
      })}
    </aside>
  );
}