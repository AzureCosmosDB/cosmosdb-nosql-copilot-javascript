import { useState, useRef, Suspense, lazy } from 'react';
import ChatHeader from './ChatHeader'; // Import the new ChatHeader component
import useScrollToBottom from '../hooks/useScrollToBottom';
import useStreamResponse from '../utils/useStreamResponse';
import MessageInput from './MessageInput';
import { useMsal } from "@azure/msal-react";
import ChatMessageSkeleton from './ChatMessageSkeleton';

const ChatInterfaceSidebar = lazy(() => import('./ChatSidebar'));
const ChatMessage = lazy(() => import('./ChatMessage'));

// Define the structure of a message
export interface Message {
  role: 'user' | 'assistant'; // The role of the sender, either user or assistant (AI)
  content: string; // The message content
  tokens: number; // Number of tokens (likely used for some kind of analysis or cost)
  time: Date; // Timestamp of when the message was sent
}

interface IUserProfile {
  authorityType: string;
  name: string;
  username: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', content: 'This is a demo user Prompt?', tokens: 3, time: new Date() },
    { role: 'assistant', content: '😂😂 Demo response', tokens: 2, time: new Date() },
    ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use custom hook to auto-scroll to the bottom whenever messages are updated
  useScrollToBottom(messagesEndRef, [messages]);

  // Use utility to stream responses from a backend server and update the messages state
  const streamResponse = useStreamResponse(setMessages);

  const { accounts } = useMsal(); // Get the logged-in user's account

  const userData: IUserProfile = {
    authorityType: accounts[0]?.authorityType ?? '',
    name: accounts[0]?.name ?? '',
    username: accounts[0]?.username ?? '',
  };

  const newChat = async () => {
    setMessages([]);
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for large screens */}
      <div className="hidden md:block min-w-[20%]">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <ChatInterfaceSidebar newChat={newChat} />
        </Suspense>
      </div>

      {/* Main chat content area */}
      <div className="flex-1 flex flex-col">

        {/* Header section extracted into ChatHeader component */}
        <ChatHeader userData={userData} newChat={newChat} />

        {/* Message display area with auto-scrolling */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {messages.map((message, index) => (
            <Suspense key={index} fallback={<ChatMessageSkeleton />}>
              <ChatMessage  message={message} />  
            </Suspense>
          ))}
          {/* Ref to ensure we scroll to the bottom when a new message is added */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area to send new messages */}
        <div className="p-4 bg-blue-500 dark:bg-gray-900">
          <MessageInput onSubmit={streamResponse} />
        </div>
      </div>
    </div>
  );
}
