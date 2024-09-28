
import { useState, useRef,Suspense, lazy } from 'react';
const ChatInterfaceSidebar = lazy(() => import('./ChatSidebar')); // Sidebar for the chat interface
import { Button } from './ui/button'; // Button component
import { ModeToggle } from './ModeToggle'; // Mode toggle (e.g., dark/light mode)
import useScrollToBottom from '../hooks/useScrollToBottom'; // Custom hook to scroll to the bottom when new messages arrive
import useStreamResponse from '../utils/useStreamResponse'; // Utility to stream responses from the server
import ChatMessage from './ChatMessage'; // Component for rendering individual messages
import MessageInput from './MessageInput'; // Component for the input field to send messages
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer'; // Import Drawer components
import { Menu } from 'lucide-react'; // Icon for the menu

import { useMsal } from "@azure/msal-react";
import UserProfile from './UserProfile';

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
    { role: 'user', content: 'What is the largest lake in North America?', tokens: 9, time: new Date() },
    { role: 'assistant', content: 'The largest lake in North America is Lake Superior, located on the border of the United States and Canada. (cached response)', tokens: 0, time: new Date() },
    { role: 'user', content: 'What is the second?', tokens: 5, time: new Date() },
    { role: 'assistant', content: 'The second largest lake in North America is Lake Huron, also located on the border of the United States and Canada. (cached response)', tokens: 0, time: new Date() },
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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for large screens */}
      <div className="hidden md:block min-w-[20%]">
      <Suspense fallback={<div>Loading Sidebar...</div>}>
        <ChatInterfaceSidebar />
      </Suspense>
      </div>

      {/* Main chat content area */}
      <div className="flex-1 flex flex-col">
        {/* Header section with a title, cache-clear button, and mode toggle */}
        <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex sm:justify-items-start justify-between items-center sm:gap-2">
          <Drawer>
            {/* DrawerTrigger for opening the drawer */}
            <DrawerTrigger asChild>
              <Button variant="ghost" className="left-4 md:hidden z-auto">
                <Menu className="w-6 h-6 text-black dark:text-white" />
              </Button>
            </DrawerTrigger>
            {/* DrawerContent with side="left" */}
            <DrawerContent className="w-full">
              <DrawerHeader>
                <DrawerTitle>Chat History</DrawerTitle>
              </DrawerHeader>
              <ChatInterfaceSidebar />
            </DrawerContent>
          </Drawer>
          <h1 className="text-xl font-bold text-black dark:text-white">Your Assistant</h1>
          <div className='flex justify-end gap-2'>
            <Button variant="ghost" className="text-black dark:text-white">Clear Cache</Button>
            <ModeToggle />
            <UserProfile userData={userData} />
          </div>
        </div>

        {/* Message display area with auto-scrolling */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} /> // Render each message using ChatMessage component
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
