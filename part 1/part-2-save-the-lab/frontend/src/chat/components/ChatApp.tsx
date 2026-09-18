import {useEffect, useState } from "react";
import { mockConversations } from "./mockData";
import type { Conversation, Message } from "./types";
import { ConversationList } from "./components/ConversationList";
import { ConversationHeader } from "./components/ConversationHeader";
import { MessageList } from "./components/MessageList";
import { MessageComposer } from "./components/MessageComposer";

export function ChatApp() {
    const [conversations, setConversations] = useState(mockConversations);
    const [selectedConversationId, setSelectedConversationId] = useState(mockConversations[0].id);

    const selectedConversation = conversations.find((conversation) => conversation.id === selectedConversationId);
    if (!selectedConversation) {
        return null;
    }

    const sortedConversations = [...conversations].sort((a, b) => {
        const aLast = a.messages.at(-1)?.timestamp ?? 0;
        const bLast = b.messages.at(-1)?.timestamp ?? 0;
        return bLast - aLast;
    });

    function handleSendMessage(text: string) {
        const newMessage: Message = {
            id: crypto.randomUUID(),
            text,
            sender: "me",
            status: "sending",
            timestamp: Date.now(),
        };
        const willFail = Math.random() < 0.2;
        
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === selectedConversationId
                ? { ...conversation, messages: [...conversation.messages, newMessage] }
                : conversation
            )
        );

        setTimeout(() => {
            setConversations((prev) =>
                prev.map((conversation) =>
                conversation.id === selectedConversationId
                    ? 
                    {   
                        ...conversation,
                        messages: conversation.messages.map((message) =>
                        message.id === newMessage.id
                            ? { ...message, status: willFail ? "failed" : "sent" }: message)
                    }
                    : conversation
                ),
            );
        }, 1200);
    }

    return (
        <div className="chat-shell">
            <ConversationList
                conversations={sortedConversations}
                selectedConversationId={selectedConversationId}
                onSelect={setSelectedConversationId}
            />

            <div className="chat-main">
                <ConversationHeader conversation={selectedConversation} />
                <MessageList messages={selectedConversation.messages} />
                <MessageComposer onSend={handleSendMessage} />
            </div>
        </div>
    );
}