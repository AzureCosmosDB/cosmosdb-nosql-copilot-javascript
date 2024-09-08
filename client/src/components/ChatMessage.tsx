import { BotMessageSquare, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import StyledMarkdown from "./StyledMarkdown";
import TimeAgo from "./TimeAgo";
import { Message } from "./Chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex mb-4 ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}>
      <Card className="min-w-[80%]">
        <CardHeader className={`flex flex-row ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-green-600 text-black'}`}>
          <span>
            {message.role === 'user' ? (
              <span className="flex flex-row gap-2 font-semibold">
                <User />
                User
              </span>
            ) : (
              <span className="flex flex-row gap-2 font-semibold">
                <BotMessageSquare />
                Assistant
              </span>
            )}
          </span>
          <span className="ml-auto flex flex-row gap-2 items-end text-black">
            <span className="rounded-md bg-white px-1 text-sm">Tokens: {message.tokens}</span>
            <span>
              <TimeAgo date={message.time} />
            </span>
          </span>
        </CardHeader>
        <CardContent className="p-4">
          <StyledMarkdown>{message.content}</StyledMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatMessage;
