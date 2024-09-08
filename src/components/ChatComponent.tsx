import React, { useState } from 'react';
import { sendMessage, storeMessageInCosmos } from '../services/ChatService';

interface Message {
    sender: string;
    text: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = async () => {
        
    };

    return (
        <div className="bg-stone-600 flex flex-col flex-1 min-w-full p-4 bg-gray-100 rounded-lg w-full max-w-lg mx-auto">
            <div className="flex-grow overflow-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
                        <span className="font-bold">{msg.sender}: </span>{msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded-lg mr-2"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg">
                    Send
                </button>
            </div>
        </div>
    );
};

const ChatForm =() => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = async () => {
        
    };

    return (
        <div className="flex flex-col p-4 bg-gray-100 rounded-lg w-full max-w-lg mx-auto">
            <div className="flex-grow overflow-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
                        <span className="font-bold">{msg.sender}: </span>{msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded-lg mr-2"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;
